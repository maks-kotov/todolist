import { useContext } from "react"
import styles from "./notesFilters.module.css"
import { NoteContext } from "../../../../../contexts/noteContext"
function NotesFilters() {
    const { sortByNew, sortByOld, filterByCompleteds, showAllNotes, filterByUnCompleteds } = useContext(NoteContext)!
    return (
        <div className={styles.filtersContainer}>
            <li onClick={showAllNotes} className={styles.all}>
                Все
            </li>
            <li onClick={()=>filterByCompleteds()} className={styles.completeds}>
                Выполненные
            </li>
            <li onClick={()=>filterByUnCompleteds()} className={styles.uncompleteds}>
                Невыполненные
            </li>
            <li className={styles.removeds}>Удалённые</li>
            <li onClick={()=>sortByNew()} className={styles.beginNew}>
                Cначала новые
            </li>
            <li onClick={()=>sortByOld()} className={styles.beginOld}>
                Cначала старые
            </li>
            <li className={styles.beginName}>По алфавиту</li>
        </div>
    )
}
export default NotesFilters