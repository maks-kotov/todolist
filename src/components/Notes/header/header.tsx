import styles from './header.module.css'
import ContextMenu from './contextMenu/contextMenu'
function Header() {
    
    return (
        <>
        <header className={styles.header}>
            Мои заметки
        </header>
            
        <ContextMenu />
        </>
    )
}
export default Header