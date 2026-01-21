import { useContext } from 'react'
import type { NoteType } from '../../../types/note'
import EditButton from './editButton/editButton'
import styles from './note.module.css'
import { NoteContext } from '../../../contexts/noteContext'
interface props {
    note: NoteType,
    isEdit: boolean,
    isView: boolean
}

function Note({note, isEdit, isView}:props) {
    const {remove, toggle, switchViewMode, getCurrentNote} = useContext(NoteContext)!
    return (
        <>
            <div className={styles.container}>
                <div className=
                    {note.completed ?  
                    `${styles.text} ${styles.crossedOut}`
                        : 
                    styles.text
                    }
                >
                    {note.title}
                </div>
                <button onClick={()=>toggle(note.id)} className={styles.toggle}>
                    {note.completed ? '✘' : '✔'}    
                </button>
                <button onClick={()=>remove(note.id)} className={styles.remove}>
                        <img src="./src/assets/icons/bin.png" alt="icon" />
                </button>
                <button onClick={()=>
                    {
                        switchViewMode(!isView)
                        getCurrentNote(note)
                    }} className={styles.view}>
                        <img src="./src/assets/icons/eye.png" alt="icon" />
                </button>
                <EditButton isEdit={isEdit} note={note}/>
            </div>
        </>
    )
}
export default Note