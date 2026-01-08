import EditButton from './editButton/editButton'
import styles from './node.module.css'
interface props {
    text: string,
    switchEditMode: (isEdit:boolean)=>void,
    isEdit: boolean
}
function Node({text, switchEditMode, isEdit}:props) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.text}>{text}</div>
                <button className={styles.made}>✔</button>
                <button className={styles.delete}>✗</button>
                <EditButton isEdit={isEdit} switchEditMode={switchEditMode}/>
            </div>
        </>
    )
}
export default Node