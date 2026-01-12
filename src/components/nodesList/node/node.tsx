import EditButton from './editButton/editButton'
import styles from './node.module.css'
interface props {
    text: string,
    switchEditMode: (isEdit:boolean)=>void,
    isEdit: boolean,
    id: number,
    getNodeText: (text:string)=>void
}
function Node({text, switchEditMode, isEdit, id, getNodeText}:props) {
    return (
        <>
            <div className={styles.container} data-node-id={id}>
                <div className={styles.text}>{text}</div>
                <button className={styles.made}>✔</button>
                <button className={styles.delete}>✗</button>
                <EditButton isEdit={isEdit} switchEditMode={switchEditMode} text={text} getNodeText={getNodeText}/>
            </div>
        </>
    )
}
export default Node