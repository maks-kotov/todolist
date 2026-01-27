import { useState } from "react"
import { NoteContext } from "../../contexts/noteContext"
import useNotes from "../../hooks/useNotes"
import type { NoteType } from "../../types/note"
import Create from "./create/create"
import Header from "./header/header"
import NotesList from "./notesList/notesList"
import Viewing from "./viewing/viewing"

function Notes() {
    const 
        {
        displayedNotes,
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
        }                   = useNotes()

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
    return (
        <>
            <NoteContext.Provider value={noteActions}>
                {!isEdit && !isView && <Header />} 
                {/* {!isEdit && <Search />} */}
                {
                !isView && 
                <Create id={id} incrementId={incrementId} add={add} isEdit={isEdit} currentNote={currentNote}/>
                }
                {
                !isEdit && !isView && 
                <NotesList fetchNotes={fetchNotes} displayedNotes={displayedNotes} isEdit={isEdit} isView={isView}/>
                }
                {
                !isEdit && isView && 
                <Viewing currentNote={currentNote} isView={isView}/>
                }
            </NoteContext.Provider>
        </>
    )
}
export default Notes