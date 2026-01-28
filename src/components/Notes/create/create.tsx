import { useEffect, useState} from 'react'
import styles from './create.module.css'
import EditButton from '../notesList/note/editButton/editButton'
import type { NoteType } from '../../../types/note'
interface props {
    isEdit: boolean,
    currentNote: NoteType,
    add: (note:NoteType)=>void,
    note_id: number,
    incrementNote_Id: (note_id:number)=>void
}
function Create({note_id, incrementNote_Id,isEdit, currentNote, add} : props) {
    // console.log('я сработал (create)');
    
    const [note, setNote] = useState<NoteType>({ // только при первом рендере
                            note_id: 0,
                            title: '',
                            content: '',
                            completed: false,
                            createdAt: new Date(),
                        })
    
    // console.log(counter);
    
    function changeValueTextarea(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setNote({...note, content: e.target.value})
    }
    function changeValueInput(e:React.ChangeEvent<HTMLInputElement>) {
        setNote({...note, title: e.target.value})
    }
    useEffect(()=>{
        if(isEdit) {
            setNote({...note, note_id: currentNote.note_id, title: currentNote.title,content:currentNote.content, completed: currentNote.completed, createdAt: currentNote.createdAt}) // при нажатии на кнопку готовая изменённая заметка приобретает все те же параметры, которые были у редактируемой.
        }
        else {
            setNote({...note, content: '', title: ''})
        }
    },[isEdit])
    return (
        <>
            <input onChange={changeValueInput} className={styles.makeTitle} type="text" placeholder='Заголовок...' value={note.title}/>
            <textarea onChange={changeValueTextarea} name="#" className={styles.makeText} placeholder='Основной текст... (необязательно)' 
            value={note.content}>
                
            </textarea>
            <div className={styles.right}>
                {isEdit === false ? (
                    <button onClick={()=>{
                        add({
                            note_id: note_id, // каждое нажатие на button меняет counter
                            title: note.title, // onChangeI меняет note.title
                            content: note.content, // onChangeT меняет note.content
                            completed: false, // нам он ниоткуда не приходит.
                            createdAt: new Date(), // каждый раз новая дата создания
                        })
                        incrementNote_Id(note_id)
                        setNote({...note, content: '', title: ''})
                    }} className={styles.button} type="submit">Добавить</button>
                ) : <EditButton isEdit={isEdit} note={note} id={currentNote.note_id} changes={currentNote}/>}
            </div>
        </>
    )
}
export default Create