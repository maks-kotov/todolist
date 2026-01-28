import { useState } from "react"
import { NoteContext } from "../../contexts/noteContext"
import useNotes from "../../hooks/useNotes"
import type { NoteType } from "../../types/note"
import Create from "./create/create"
import Header from "./header/header"
import NotesList from "./notesList/notesList"
import Viewing from "./viewing/viewing"

function Notes() {
    const { //тут методы заметок и информация про них
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
        note_id,
        incrementNote_Id,
        getNotes
        } = useNotes()

    const [isEdit, setIsEdit] = useState<boolean>(false) //isEdit - edit mode state
    const [isView, setIsView] = useState<boolean>(false)
    const [currentNote, setCurrentNote] = useState<NoteType>( // редактируемая
    { 
      note_id: 0,
      title: 'no',
      content: 'no',
      completed: false,
      createdAt: new Date()
    }
)

    return (
        <>
            <NoteContext.Provider value={
                {
                    update,
                    remove,
                    toggle,
                    sortByNew,
                    sortByOld,
                    filterByCompleteds,
                    showAllNotes,
                    filterByUnCompleteds,
                    switchEditMode: (isEdit:boolean)=>setIsEdit(isEdit),
                    switchViewMode: (isView:boolean)=>setIsView(isView),
                    getCurrentNote: (note:NoteType)=>setCurrentNote(note)
                }
            }>
                {!isEdit && !isView && <Header />} 
                {/* {!isEdit && <Search />} */}
                {
                !isView && 
                <Create note_id={note_id} incrementNote_Id={incrementNote_Id} add={add} isEdit={isEdit} currentNote={currentNote}/>
                }
                {
                !isEdit && !isView && 
                <NotesList getNotes={getNotes} displayedNotes={displayedNotes} isEdit={isEdit} isView={isView}/>
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