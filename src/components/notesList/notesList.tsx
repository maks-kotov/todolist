import { useEffect } from 'react'
import type { NoteType } from '../../types/note'
import Note from './note/note'
import styles from './notesList.module.css'
interface props {
    displayedNotes: NoteType[],
    isEdit: boolean,
    isView: boolean,
    fetchNotes: ()=>void
}
function NotesList({displayedNotes, isEdit, isView, fetchNotes} : props) {
    useEffect(()=> {
        fetchNotes()
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