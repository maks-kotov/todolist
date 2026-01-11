import styles from './editButton.module.css'
interface props {
    switchEditMode: (isEdit:boolean)=>void,
    isEdit: boolean
}
function EditButton({switchEditMode, isEdit}:props) {
    return (
                <button onClick={()=>switchEditMode(!isEdit)} className={styles.edit}>
                    <img src="./src/assets/icons/edit.png" alt="icon" />
                </button>
    )
}
export default EditButton

// при клике на edit value textarea должно быть равно тексту из node
// при клике на edit value textarea должно быть равно тексту из node