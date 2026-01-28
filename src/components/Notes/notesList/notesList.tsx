import { useEffect } from 'react'
import Note from './note/note'
import styles from './notesList.module.css'
import type { NoteType } from '../../../types/note'
interface props {
    displayedNotes: NoteType[],
    isEdit: boolean,
    isView: boolean,
    getNotes: ()=>void
}
function NotesList({displayedNotes, isEdit, isView, getNotes} : props) {
    useEffect(()=> {
        getNotes()
    }, [])
    return (
        <>
            <span className={styles.title}>Список:</span>
            {displayedNotes.length === 0 ? (
                <p className={styles.emptyMessage}>Создайте первую заметку</p>
            ) 
            : 
            displayedNotes.map(note=> <Note isEdit={isEdit} isView={isView} note={note} key={note.id}/>)}
        </>
    )
}
export default NotesList