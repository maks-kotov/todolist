import { useRef, useState } from "react"
import styles from "./contextMenu.module.css"
import NotesFilters from "./noteFilters/notesFilters"
//отвечает за появление contextMenu
function ContextMenu() {
    const [stateContextMenu, setStateContextMenu] = useState<boolean>(false) 
    const contextMenuRef = useRef<HTMLUListElement>(null)
    const tribarRef = useRef<HTMLDivElement>(null)
    function handleOnClickOutside(e: MouseEvent) {
        if(e.target instanceof Node 
            && tribarRef.current !== null
            && !tribarRef.current.contains(e.target) 
            && !contextMenuRef.current?.contains(e.target)
        ) {
            setStateContextMenu(false)  
        }
    }
    if(stateContextMenu) {
        document.addEventListener('click', handleOnClickOutside)
    }
    else {
        document.removeEventListener('click', handleOnClickOutside)
    }
    return (
            <>
                <div ref={tribarRef} className={styles.tribar} onClick={()=>setStateContextMenu((prev)=>!prev)}>
                    ≡
                </div>
            {stateContextMenu && (
            <>
                <ul className={styles.contextMenu} tabIndex={0} ref={contextMenuRef}>
                    <div className={styles.title}>Фильтры:</div>
                    <NotesFilters />
                </ul>
                <div className={styles.overlay}></div>
            </>
            )}
            </>
    )
}
export default ContextMenu