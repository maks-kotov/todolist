import { useEffect, useRef } from "react"
import styles from "./contextMenu.module.css"
interface props {
    updateStateContextMenu: (state:boolean)=> void,
    stateContextMenu: boolean,
    tribar: HTMLElement,
}
function ContextMenu({updateStateContextMenu, stateContextMenu, tribar}:props) {
    const contextMenuRef = useRef<HTMLUListElement>(null)
    useEffect(()=>{
        function handleOnClick(e: MouseEvent) {
            if(e.target instanceof Node 
                && !tribar.contains(e.target) 
                && !contextMenuRef.current?.contains(e.target)) {
                updateStateContextMenu(!stateContextMenu)
            }
        }

        document.addEventListener('click', handleOnClick)
        return () => {
            document.removeEventListener('click', handleOnClick)
        }
    }) 
    return (
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
    )
}
export default ContextMenu