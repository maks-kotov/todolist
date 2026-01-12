import Node from './node/node'
import styles from './nodesList.module.css'
interface props {
    nodeArr: string[],
    switchEditMode: (isEdit:boolean)=>void,
    isEdit: boolean,
    getNodeText: (text:string)=>void
}
function NodesList({nodeArr, switchEditMode, isEdit, getNodeText} : props) {
    return (
        <>
            <span className={styles.title}>Список:</span>
            
            
            {nodeArr.length === 0 ? (
                <p className={styles.emptyMessage}>Создайте первую заметку</p>
            ) 
            : 
            nodeArr.map((text, i)=>(
                <Node isEdit={isEdit} switchEditMode={switchEditMode} key={i} text={text} id={i} getNodeText={getNodeText}/>
            ))}
        </>
    )
}
export default NodesList