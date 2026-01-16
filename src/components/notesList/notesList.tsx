import type { NoteType } from '../../types/note'
import Note from './note/note'
import styles from './notesList.module.css'
interface props {
    notesArr: NoteType[],
    isEdit: boolean,
    editedNote: NoteType
}
function NodesList({notesArr, isEdit, editedNote} : props) {
    return (
        <>
            <span className={styles.title}>Список:</span>
            {notesArr.length === 0 ? (
                <p className={styles.emptyMessage}>Создайте первую заметку</p>
            ) 
            : 
            notesArr.map(note=> {

                if(note.id === editedNote.id) {
                    note = editedNote
                }
                return (
                    <Note isEdit={isEdit} note={note} key={note.id}/>
                )
            } 
            )}
        </>
    )
}
export default NodesList