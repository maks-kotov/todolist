import { useRef, useState } from "react"
import styles from "./contextMenu.module.css"

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
                    <div>Фильтры:</div>
                    <li className={styles.beginNew}>Cначала новые</li>
                    <li className={styles.beginOld}>Cначала старые</li>
                    <li className={styles.beginName}>Сортировать по алфавиту</li>
                    <li className={styles.completeds}>Выполненные</li>
                    <li className={styles.uncompleteds}>Невыполненные</li>
                    <li className={styles.removeds}>Удалённые</li>
                </ul>
                <div className={styles.overlay}></div>
            </>
            )}
            </>
    )
}
export default ContextMenu