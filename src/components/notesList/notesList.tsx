import Note from './note/note'
import styles from './notesList.module.css'
interface props {
    noteArr: string[],
    switchEditMode: (isEdit:boolean)=>void,
    isEdit: boolean,
    getNoteText: (text:string)=>void,
    changedText: string
}
function NodesList({noteArr, switchEditMode, isEdit, getNoteText, changedText} : props) {
    return (
        <>
            <span className={styles.title}>Список:</span>
            
            
            {noteArr.length === 0 ? (
                <p className={styles.emptyMessage}>Создайте первую заметку</p>
            ) 
            : 
            noteArr.map((text, i)=>(
                // если id текущей !== id нашей изменяймой, то пишем текст из массива, а если ===, то изменённый.
                <Note isEdit={isEdit} switchEditMode={switchEditMode} key={i} text={text} id={i} getNoteText={getNoteText}/>
            ))}
        </>
    )
}
export default NodesList