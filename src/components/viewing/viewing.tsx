import { useContext } from 'react'
import styles from './viewing.module.css'
import { NoteContext } from '../../contexts/noteContext'
import type { NoteType } from '../../types/note'
interface props {
    isView: boolean,
    currentNote: NoteType
}

function Viewing({ isView, currentNote }:props) {
    //работаем с viewing
    const {switchViewMode} = useContext(NoteContext)!
    return (
        <> 
                <div 
                onClick={()=>switchViewMode(!isView)} className={styles.back1}>
                    <img src="./src/assets/icons/arrow.png" alt="arrow" />
                </div>
            <div className={styles.container}>
                <div className={styles.title}>
                    {currentNote.title}
                </div>
                <div className={styles.text}>
                    {currentNote.content}
                </div>
            </div>
                <div onClick={()=>switchViewMode(!isView)}
                    className={styles.back2}>
                    <img src="./src/assets/icons/arrow.png" alt="arrow" />
                </div>
        </>
    )
}
export default Viewing