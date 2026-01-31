import Note from './note/note'
import styles from './notesList.module.css'
import type { NoteType } from '../../../types/note'
import BigSpinner from '../../bigSpinner/bigSpinner';
// import { useAuth } from '../../../contexts/authContext'
interface props {
    displayedNotes: NoteType[],
    isEdit: boolean,
    isView: boolean,
    gettingLoading: boolean
}
function NotesList({displayedNotes, isEdit, isView, gettingLoading} : props) {
    // const {isLoading} = useAuth()
    
    console.log('перерисовка. видоизменённый массив: ', displayedNotes, gettingLoading);
    return (
        <>
            <span className={styles.title}>Список:</span>
            {
                //если gettingLoading true - показываем спиннер, если нет - то, код заметок
            gettingLoading ?
               <BigSpinner />
            :
            displayedNotes.length === 0 ? (
                <p className={styles.emptyMessage}>Создайте первую заметку</p>
            ) 
            : 
            displayedNotes.map(note=> <Note isEdit={isEdit} isView={isView} note={note} key={note.note_id}/>)
            }
        </>
    )
}
export default NotesList