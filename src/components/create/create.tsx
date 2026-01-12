import { useEffect, useState} from 'react'
import styles from './create.module.css'
import EditButton from '../notesList/note/editButton/editButton'
interface props {
    pushNote: (node:string) => void,
    isEdit: boolean,
    switchEditMode: (isEdit:boolean)=>void,
    editingText: string,
    getTextareaText: (text:string)=>void
}
function Create({pushNote, isEdit, switchEditMode, editingText, getTextareaText} : props) {
    const [value, setValue] = useState<string>('')
    function changeValue(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value)
    }
    useEffect(()=>{
        if(isEdit) {
            setValue(editingText)
        }
        else {
            setValue('')
        }
    },[isEdit])
    return (
        <>
            <textarea onChange={changeValue} name="#" className={styles.textarea} placeholder='Создать заметку...' value={value}>
                
            </textarea>
            <div className={styles.right}>
                {isEdit === false ? (
                    <button onClick={()=>{
                        pushNote(value)
                        setValue('')
                    }} className={styles.button} type="submit">Добавить</button>
                ) : <EditButton isEdit={isEdit} switchEditMode={switchEditMode} getTextareaText={getTextareaText} text={value}/>}
            </div>
        </>
    )
}
export default Create