import './App.css'
import Header from './components/header/header'
// import Search from './components/search/search'
import Create from './components/create/create'
import NotesList from './components/notesList/notesList'
import { useState } from 'react'
import type { NoteType } from './types/note'
import { NoteContext } from './contexts/noteContext'
import Viewing from './components/viewing/viewing'
import { supabase } from './lib/supabase.ts'

function App() {

  type useNotesReturn = {
    displayedNotes: NoteType[],
    id: number,
    incrementId: (id:number)=>void
    update: (id:number, changes:NoteType) => void,
    add: (note:NoteType)=>void,
    remove: (id:number)=>void,
    toggle: (id:number)=>void,
    sortByNew: ()=>void,
    sortByOld: ()=>void,
    showAllNotes: ()=>void
    // filterByAlphabet: ()=>void,
    filterByCompleteds: ()=>void,
    filterByUnCompleteds: ()=>void,
    // filterByRemoveds: ()=>void,
    fetchNotes: ()=>void 
  }

  const useNotes = ():useNotesReturn =>  {

    const [allNotes, setAllNotes] = useState <NoteType[]>([])
    const [filteredNotes, setFilteredNotes] = useState<null | NoteType[]>(null)
    const displayedNotes = filteredNotes === null ? allNotes : filteredNotes
    const [id, setId] = useState<number>(0)
    const incrementId = (id:number)=> {
      setId(++id)
    }
    const fetchNotes = async ()=> {
      supabase.auth.getSession()
      .then(({data: { session }})=> {
        console.log(session);
        
      })
      try {
        const {data, error} = await supabase
        .from('notes')
        .select('*')
        .order('createdAt', {ascending: false})
        if(error) throw error;
        setAllNotes(data || [])
      } catch (error) {
        console.log("ОШИБОЧКА");
      }
    }

    

    const add = async (note:NoteType) => {
      // const { data: { session } } = await supabase.auth.getSession()
        
      setAllNotes(prev => {
        if(note.content.trim()) {
          return [...prev, note]
        }
        return prev
      });

      /* try {
      const { data, error } = await supabase
        .from('notes')
        .insert(note)
        .select();
        
        if(error) throw error;
        if(data) {
          alert('successs')
          console.log('я не знаю что это: ', data);
        }
      } catch (error) {
        alert('lose')
        
      } */
      
    }
    const remove = (id:number) => setAllNotes(prev => prev.filter(n => n.id !== id));
    const update = (id:number, changes:NoteType) => setAllNotes(prev => 
      prev.map(n => n.id === id ? {...n, ...changes} : n)
    );
    const toggle = (id:number) => setAllNotes(prev =>
      prev.map(n => n.id === id ? {...n, completed: !n.completed} : n)
    );
    
    //сортировка::
    const sortByNew = () => {
      setAllNotes([...allNotes].sort((a,b)=>b.createdAt.getTime() - a.createdAt.getTime()))
    }
    const sortByOld = () => {
      setAllNotes([...allNotes].sort((a,b)=>a.createdAt.getTime() - b.createdAt.getTime()))
    }
    //фильтры:
    const showAllNotes = ()=> {
      setFilteredNotes(null)
    }
    const filterByCompleteds = ()=> {
      setFilteredNotes(null)
      const filtered = allNotes.filter((note)=>note.completed)
      setFilteredNotes(filtered)
    }
    const filterByUnCompleteds = ()=> {
      setFilteredNotes(null)
      const filtered = allNotes.filter((note)=>!note.completed)
      setFilteredNotes(filtered)
    }

    return { displayedNotes, id, incrementId, add, update, remove, toggle, sortByNew, sortByOld, filterByCompleteds, filterByUnCompleteds, showAllNotes,  fetchNotes };
  }
  const {displayedNotes,
          update, 
          add, 
          remove, 
          toggle, 
          sortByNew, 
          sortByOld, 
          showAllNotes,
          filterByCompleteds,
          filterByUnCompleteds,
          id,
          incrementId,
          fetchNotes

        } = useNotes()
console.log(displayedNotes);
  
  const [isEdit, setIsEdit] = useState<boolean>(false) //isEdit - edit mode state
  const [isView, setIsView] = useState<boolean>(false)
  
  const [currentNote, setCurrentNote] = useState<NoteType>( // редактируемая
    { 
      id: 0,
      title: 'no',
      content: 'no',
      completed: false,
      createdAt: new Date()
    }
  )
  
  const noteActions = {
    switchEditMode(isEdit:boolean) {
      setIsEdit(isEdit)
    },
    switchViewMode(isView:boolean) {
      setIsView(isView)
    },
    getCurrentNote(note:NoteType) { // изменить на getCurrentNote и её зависимости
      setCurrentNote(note)
    },
    update,
    remove,
    toggle,
    sortByNew,
    sortByOld,
    filterByCompleteds,
    showAllNotes,
    filterByUnCompleteds
  }
/* 
баг: если добавил заметку, сразу её посмотрел, затем создал новую и изменил, то изменения будут и на первой заметке.
  почему так происходит?
  ответ: когда мы нажимаем кнопку view - вызывается функция switchViewMode, которая размонтирует header, notelist, create и монтирует viewing.  
  =>
  если мы повторно нажмём на кнопку view, то у create будет обновлённый счётчик id, который будет считать с 0. у каждой новодобавленной id идти от 0

  также она вызывает функцию getCurrentNote. это  заставляет заново сработать app.tsx, меняет состояние currentNote и перерисовывает всё то, где используется currentNote (это create.tsx и view.tsx).
  create.tsx срабатывает, но в нём ниче не происходит (useState'ы не перезаписываются при ререндере).
  view.tsx срабатывает и рисует поле всё место для чтения
*/
  return (
      <NoteContext.Provider value={noteActions}>
        
        {!isEdit && !isView && <Header />} 
        {/* {!isEdit && <Search />} */}
        {!isView && <Create id={id} incrementId={incrementId} add={add} isEdit={isEdit} currentNote={currentNote}/>}
        {!isEdit && !isView && <NotesList fetchNotes={fetchNotes} displayedNotes={displayedNotes} isEdit={isEdit} isView={isView}/>}
        {!isEdit && isView && <Viewing currentNote={currentNote} isView={isView}/>}
      </NoteContext.Provider>
  )
}

export default App
