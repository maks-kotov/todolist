import './App.css'
import Header from './components/header/header'
import Search from './components/search/search'
import Create from './components/create/create'
import NotesList from './components/notesList/notesList'
import { useState } from 'react'
import type { NoteType } from './types/note'
import { NoteContext } from './contexts/noteContext'


function App() {
  type useNotesReturn = {
    displayedNotes: NoteType[],
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
  }

  const useNotes = ():useNotesReturn =>  {

    const [allNotes, setAllNotes] = useState <NoteType[]>([])
    const [filteredNotes, setFilteredNotes] = useState<null | NoteType[]>(null)
    const displayedNotes = filteredNotes === null ? allNotes : filteredNotes

    const add = (note:NoteType) => setAllNotes(prev => {
      if(note.content.trim()) {
        return [...prev, note]
      }
      return prev
    });
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

    return { displayedNotes, add, update, remove, toggle, sortByNew, sortByOld, filterByCompleteds, showAllNotes, filterByUnCompleteds };
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
          filterByUnCompleteds

        } = useNotes()

  const [isEdit, setIsEdit] = useState<boolean>(false) //isEdit - edit mode state
  const [editingNote, setEditingNote] = useState<NoteType>( // редактируемая
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
    getEditingNote(note:NoteType) {
      setEditingNote(note)
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

  return (
      <NoteContext.Provider value={noteActions}>
        
        {!isEdit && <Header />} 
        {!isEdit && <Search />}
        <Create add={add} isEdit={isEdit} editingNote={editingNote}/>
        {!isEdit &&<NotesList displayedNotes={displayedNotes} isEdit={isEdit}/>}

      </NoteContext.Provider>
  )
}

export default App
