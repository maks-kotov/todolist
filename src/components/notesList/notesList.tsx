import type { NoteType } from '../../types/note'
import Note from './note/note'
import styles from './notesList.module.css'
interface props {
    notes: NoteType[],
    isEdit: boolean,
}
function NodesList({notes, isEdit} : props) {
    console.log(notes);
    return (
        <>
            <span className={styles.title}>Список:</span>
            {notes.length === 0 ? (
                <p className={styles.emptyMessage}>Создайте первую заметку</p>
            ) 
            : 
            notes.map(note=> <Note isEdit={isEdit} note={note} key={note.id}/>)}
        </>
    )
}
export default NodesList