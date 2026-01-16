import './App.css'
import Header from './components/header/header'
import Search from './components/search/search'
import Create from './components/create/create'
import NotesList from './components/notesList/notesList'
import { useState } from 'react'
import type { NoteType } from './types/note'
import { NoteEditingActionsContext } from './contexts/noteEditingActions'


function App() {
  const [notesArr, setNotesArr] = useState <NoteType[]>([]) //почему не nodesArr?))
  const [isEdit, setIsEdit] = useState<boolean>(false) //isEdit - edit mode state
  const [editingNote, setEditingNote] = useState<NoteType>( // редактируемая
    { 
      id: 0,
      title: 'no',
      content: 'no',
      completed: false
    }
  )
  const [editedNote, setEditedNote] = useState<NoteType>( //отредактированная
    {
      id: -1, 
      title: 'я изменённая заметка по умолчанию',
      content: 'no',
      completed: false
    }
  )
  function pushNote(note:NoteType):void {
    if(note.content.trim()) {
      setNotesArr((prevArr:NoteType[])=>[...prevArr, note])
    }
  }  
  const noteEditingActions = {
    switchEditMode(isEdit:boolean) {
      setIsEdit(isEdit)
    },
    getEditingNote(note:NoteType) {
      setEditingNote(note)
    },
    getEditedNote(note:NoteType) {
      setEditedNote(note)
    },
  }
  /* function switchEditMode(isEdit:boolean) {
    setIsEdit(isEdit)
  } 
  function getEditingNote(note:NoteType) { // получить редактируемую заметку при клике на nodeList>editButton
    setEditingNote(note) // ОТ УЛЫБКИ СТАНЕТ МИР СВЕТЛЕЙ
  }
  function getEditedNote(note:NoteType) { // получить отредактированную заметку из create
    setEditedNote(note)
  } */
  return (
  <div>
      {/*если настоящее значение false, то мы показываем. !isEdit даёт true и оно покажется  */}
      {!isEdit && <Header />} 
      {!isEdit && <Search />}
      <NoteEditingActionsContext.Provider value={noteEditingActions}>
        <Create pushNote={pushNote}  isEdit={isEdit} editingNote={editingNote}/>
      </NoteEditingActionsContext.Provider>
      {!isEdit &&
      <NoteEditingActionsContext.Provider value={noteEditingActions}>
        <NotesList notesArr={notesArr} isEdit={isEdit} editedNote={editedNote}/>
      </NoteEditingActionsContext.Provider>
      }
  </div>
  )
}

export default App
