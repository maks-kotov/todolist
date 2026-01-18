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
    notes: NoteType[],
    update: (id:number, changes:NoteType) => void,
    add: (note:NoteType)=>void,
    remove: (id:number)=>void,
    toggle: (id:number)=>void,
  }

  const useNotes = ():useNotesReturn =>  {
    const [notes, setNotes] = useState <NoteType[]>([])
    const add = (note:NoteType) => setNotes(prev => {
      if(note.content.trim()) {
        return [...prev, note]
      }
      return prev
    });
    const remove = (id:number) => setNotes(prev => prev.filter(n => n.id !== id));
    const update = (id:number, changes:NoteType) => setNotes(prev => 
      prev.map(n => n.id === id ? {...n, ...changes} : n)
    );
    const toggle = (id:number) => setNotes(prev =>
      prev.map(n => n.id === id ? {...n, completed: !n.completed} : n)
    );
    
    return { notes, add, update, remove, toggle };
  }
  const {notes, update, add, remove, toggle} = useNotes()

  const [isEdit, setIsEdit] = useState<boolean>(false) //isEdit - edit mode state
  const [editingNote, setEditingNote] = useState<NoteType>( // редактируемая
    { 
      id: 0,
      title: 'no',
      content: 'no',
      completed: false
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
    toggle
  }

  return (
      <NoteContext.Provider value={noteActions}>
        
        {!isEdit && <Header />} 
        {!isEdit && <Search />}
        <Create add={add} isEdit={isEdit} editingNote={editingNote}/>
        {!isEdit &&<NotesList notes={notes} isEdit={isEdit}/>}

      </NoteContext.Provider>
  )
}

export default App
