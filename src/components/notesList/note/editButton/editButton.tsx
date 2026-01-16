import { useContext } from 'react'
import type { NoteType } from '../../../../types/note'
import styles from './editButton.module.css'
import { NoteEditingActionsContext } from '../../../../contexts/noteEditingActions'
interface props {
    isEdit: boolean, //нужно для динамичной отрисовки и вставления текста в textarea
    note: NoteType, 
}
function EditButton({note, isEdit}:props) {
    const noteEditingActions = useContext(NoteEditingActionsContext)
    return (
                <button onClick={()=>{
                    if (noteEditingActions?.getEditingNote) {
                    noteEditingActions.getEditingNote(note)
                    }
                    if (noteEditingActions?.getEditedNote) {
                    noteEditingActions.getEditedNote(note)
                    }
                    noteEditingActions?.switchEditMode(!isEdit)
                    }
                } className={styles.edit}>
                    <img src="./src/assets/icons/edit.png" alt="icon" />
                </button>
    )
}
export default EditButton

// при клике на edit value textarea должно быть равно тексту из node
// при клике на edit value textarea должно быть равно тексту из node

//можно в app.tsx сделать функцию getText, передать её пропсами до editButton и 

//есть 2 способа: брать текст из массива и брать текст из заметки по конкретному id

// мы должны при клике на editButoon выяснить текст этой заметки по id и передать его в app.tsx