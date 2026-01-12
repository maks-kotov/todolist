import { useState} from 'react'
import styles from './create.module.css'
import EditButton from '../nodesList/node/editButton/editButton'
interface props {
    onButtonClick: (node:string) => void,
    isEdit: boolean,
    switchEditMode: (isEdit:boolean)=>void,
    editingText: string
}
function Create({onButtonClick, isEdit, switchEditMode} : props) {
    const [value, setValue] = useState<string>('')
    function changeValue(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value)
    }
    return (
        <>
            <textarea onChange={changeValue} name="#" className={styles.textarea} placeholder='Создать заметку...' value={value}>
                
            </textarea>
            <div className={styles.right}>
                {isEdit === false ? (
                    <button onClick={()=>{
                        onButtonClick(value)
                        setValue('')
                    }} className={styles.button} type="submit">Добавить</button>
                ) : <EditButton isEdit={isEdit} switchEditMode={switchEditMode}/>}
            </div>
        </>
    )
}
export default Create