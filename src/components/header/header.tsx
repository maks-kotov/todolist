import { useRef, useState } from 'react'
import styles from './header.module.css'
import ContextMenu from './contextMenu/contextMenu'
function Header() {
    const tribarRef = useRef(null)
    const [stateContextMenu, setStateContextMenu] = useState<boolean>(false) 
    function updateStateContextMenu(state:boolean) {
        setStateContextMenu(state)
    }
    return (
        <>
        <header className={styles.header}>
            Мои заметки
        </header>
            <div ref={tribarRef} className={styles.tribar} onClick={()=>setStateContextMenu((prev)=>!prev)}>
                ≡
            </div>
            {stateContextMenu && <ContextMenu updateStateContextMenu={updateStateContextMenu} stateContextMenu={stateContextMenu} tribar={tribarRef.current}/>}
        </>
    )
}
export default Header