import { useEffect, useState} from 'react'
import styles from './create.module.css'
import EditButton from '../notesList/note/editButton/editButton'
import type { NoteType } from '../../../types/note'
import Spinner from '../../Auth/spinner/spinner'
interface props {
    isEdit: boolean,
    currentNote: NoteType,
    add: (note:NoteType)=>void,
    addingLoading: boolean
}
function Create({isEdit, currentNote, add, addingLoading} : props) {
    // console.log('я сработал (create)');
    
    const [note, setNote] = useState<NoteType>({ // только при первом рендере
                            note_id: 0,
                            title: '',
                            content: '',
                            completed: false,
                            created_at: 'create',
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
            setNote({...note, note_id: currentNote.note_id, title: currentNote.title,content:currentNote.content, completed: currentNote.completed, created_at: currentNote.created_at}) // при нажатии на кнопку готовая изменённая заметка приобретает все те же параметры, которые были у редактируемой.
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
                {
                isEdit === false ? (
                    <button onClick={()=>{
                        add({
                            note_id: -6, // каждое нажатие на button меняет counter
                            title: note.title, // onChangeI меняет note.title
                            content: note.content, // onChangeT меняет note.content
                            completed: false, // нам он ниоткуда не приходит.
                            created_at: 'create2', // каждый раз новая дата создания
                        })
                        setNote({...note, content: '', title: ''})
                    }} className={styles.button} type="submit" disabled={addingLoading}>
                    {addingLoading ? <Spinner /> : 'Добавить'}
                    </button>
                ) : <EditButton isEdit={isEdit} note={note} id={currentNote.note_id} changes={currentNote}/>
                
                }
            </div>
        </>
    )
}
export default Create