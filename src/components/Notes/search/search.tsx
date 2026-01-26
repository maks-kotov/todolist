import styles from './search.module.css'
function Search() {
    return (
        <>
        <input placeholder='Поиск...' type="text" className={styles.search}/>
        </>
    )
}
export default Search