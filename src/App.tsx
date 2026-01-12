import './App.css'
import Header from './components/header/header'
import Search from './components/search/search'
import Create from './components/create/create'
import NodesList from './components/notesList/notesList'
import { useState } from 'react'
// import C1 from './components/c1/c1'
function App() {
  // пускай мы что-то набираем, потоом оно передаётся в родителя, потом в nodesList, а потом в node
  type Note = {
    id: number,
    title: string,
    content: string,
    completed: boolean
  };
  const [noteArr, setNoteArr] = useState <string[]>([]) 
  const [isEdit, setIsEdit] = useState<boolean>(false) //isEdit - edit mode state
  const [editingText, setEditingText] = useState<string>('labubu')
  const [textareaText, setTextareaText] = useState<string>('fuck')
  function pushNote(node:string):void {
    if(node.trim()) {
      setNoteArr((prevArr:string[])=>[...prevArr, node])
    }
  }  
  function switchEditMode(isEdit:boolean) {
    setIsEdit(isEdit)
  } 
  //проблемы с тайпскриптом с вот этим text внизу
  function getNoteText(text:string) { // чтобы получить текст из редактируемой заметки и вставить его в textarea
    setEditingText(text)
    console.log('текст заметки: ' + text);
  }
  function getTextareaText(text:string) {
    setTextareaText(text)
    console.log('текст изменённой заметки: ' + text);
    
  }
  return (
  <div>
      {!isEdit && <Header />} {/*если настоящее значение false, то мы показываем. !editNodeIsClicked даёт true и оно покажется  */}
      {!isEdit && <Search />}
       <Create pushNote={pushNote} switchEditMode={switchEditMode} isEdit={isEdit} editingText={editingText} getTextareaText={getTextareaText}/> {/*редактируемый текст приходит из node, вставляется в textarea, затем мы отслеживаем что мы наизменяли в textarea и отправляем изменённый назад */}
      {!isEdit &&
      <NodesList noteArr={noteArr} switchEditMode={switchEditMode} isEdit={isEdit} getNoteText={getNoteText} changedText={textareaText}/>
      }
  </div>
  )
}

export default App
