import EditButton from './editButton/editButton'
import styles from './note.module.css'
interface props {
    text: string,
    switchEditMode: (isEdit:boolean)=>void,
    isEdit: boolean,
    id: number,
    getNoteText: (text:string)=>void
}
function Note({text, switchEditMode, isEdit, id, getNoteText}:props) {
    return (
        <>
            <div className={styles.container} data-node-id={id}>
                <div className={styles.text}>{text}</div>
                <button className={styles.made}>✔</button>
                <button className={styles.delete}>✗</button>
                <EditButton isEdit={isEdit} switchEditMode={switchEditMode} text={text} getNoteText={getNoteText}/>
            </div>
        </>
    )
}
export default Note