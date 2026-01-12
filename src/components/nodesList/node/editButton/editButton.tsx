import styles from './editButton.module.css'
interface props {
    switchEditMode: (isEdit:boolean)=>void,
    isEdit: boolean,
    text?: string, // эта кнопка может быть и не в заметке
    getNodeText?: (text:string)=>void
}
function EditButton({switchEditMode, text, isEdit, getNodeText}:props) {
    return (
                <button onClick={()=>{
                    //!isEdit && getNodeText?.(text)
                    if (getNodeText && text) {
                    getNodeText(text)
                    }
                    //getNodeText?.(text) //если isEdit false, то передаём текст заметки наверх
                    switchEditMode(!isEdit)
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