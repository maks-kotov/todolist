import type { NoteType } from '../../types/note'
import Note from './note/note'
import styles from './notesList.module.css'
interface props {
    displayedNotes: NoteType[],
    isEdit: boolean,
}
function NotesList({displayedNotes, isEdit} : props) {
    return (
        <>
            <span className={styles.title}>Список:</span>
            {displayedNotes.length === 0 ? (
                <p className={styles.emptyMessage}>Создайте первую заметку</p>
            ) 
            : 
            displayedNotes.map(note=> <Note isEdit={isEdit} note={note} key={note.id}/>)}
        </>
    )
}
export default NotesList