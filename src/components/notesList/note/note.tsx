import type { NoteType } from '../../../types/note'
import EditButton from './editButton/editButton'
import styles from './note.module.css'
interface props {
    note: NoteType,
    isEdit: boolean,
}
function Note({note, isEdit}:props) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.text}>{note.content}</div>
                <button className={styles.made}>✔</button>
                <button className={styles.delete}>✗</button>
                <EditButton isEdit={isEdit} note={note}/>
            </div>
        </>
    )
}
export default Note