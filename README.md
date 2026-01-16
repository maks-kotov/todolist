# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

<!-- ```md -->
<b>ctrl + shift + v</b> - красиво смотреть этот файл

**как работает этот проект:**
по классике index.html>main.tsx>app.tsx.

**что рисуется:**
у нас в app.tsx  возвращается 4 компонента:
header, search, create, nodelist
<!-- isEdit - переменная состояния режима редактирования заметки. может быть true/false
если isEdit === false, то  мы рисуем header, search, nodelist. 
если жн он true, то рисуем create только create. -->
**********************************************************************************
**ШАГ 1**  
**как заметка попадает в nodeList и где она делается НАЧАЛО:**

в app.tsx:  
В арp.tsx объявлена переменная состояния nodeArr. nodeArr - массив объектов (заметок) с типом NoteType.nodeArr передаётся в nodelist (по умолчанию пустой)  
также объявлена функция pushNode, принимающая параметром объект (заметку) и заносящая его в массив.  
эту функцию мы передаём через props в компонент create
в компоненте create мы её принимаем.  

в create.tsx:  
Объявляем переменную состояния note типа NoteType со значением какого-то объекта по умолчанию (пофик).   
note.content присвоено textarea в качестве value.
также объявлена функция changeValue, которая срабатывает на событие onChange в textarea и присваивает note.content актуальное значение value (e.target.value).  
=>note.content будет равен актуальному тексту текстерии  
   
При нажатии на кнопку note каким-то образом должен попадать в массив nodeArr. Для этого мы передали в create.tsx функцию pushNode, которая засовывает объект(note), переданный параметром в массив nodeArr.   
И вот на кнопке при событии onClick будет срабатывать функция pushNode, c параметром note, которая засунет note в массив. Выполнение кода на этом моменте переходит назад в app.tsx, тк функция pushNode находится там.  
  
nodelist.tsx:  
Мы помним, что сюда пЕреДаётся пропс nodeArr из app.tsx. А раз мы изменили состояние nodeArr в app.tsx, то все компоненты, которые его используют перерисуются (nodeList). => здесь сейчас лежит уже не пустой массив, а с одной заметкой. Eсли он пустой - пишем создайте первую заметку, а если не пустой, то делаем nodeArr.length заметок (компонент node.tsx) и вставляем их в код через метод массива map.   

node.tsx:  
просто разметка заметки с отдельно вынесенной компонентой editButton.tsx
  
editButton.tsx:  
кнопка для редактирования заметки. я её вынес, чтобы реализовать возможность редактирования заметок.
  
**как заметка попадает в nodeList и где она делается КОНЕЦ**
***********************************************************************************
  
-----------------------------------------------------------------------------------
**ШАГ 2**  
**как происходит редактирование заметки НАЧАЛО**  
app.tsx:  
Cоздали переменную состояния isEdit, по умолчанию имеющую значение false, отвечающую за то активен ли сейчас режим редактирования.  
когда мы рисуем компоненты, то ставим условие {!isEdit && component}, которое покажет компонент если isEdit имеет значение false.  
    
также объявили переменные состояния editingNotе (текущая редактируемая заметка), editedNotе (текущая отредактированная заметка), функции getEditingNote (получить редактируемую заметку)  и getEditedNote (получить отредактированную заметку).  

в create.tsx передаём editingNote <string>('labubu'), isEdit <boolean>(false), getEditedNote <function> (=>void)

create.tsx
при загрузке компонента:  

если isEdit === false, то под textarea будет кнопка добавить   
если isEdit === true - то под textarea будет editButton.tsx,  которой передаём isEdit, switchEditMode, getEditiedNote  

если isEdit === false, то value textarea будет пустым  
если isEdit === true, то value textarea будет = editingNote.tsx    
  
при первой загрузке страницы editingNotes передаётся сюда из app.tsx со значением 'labubu', но оно не встанет в textarea, тк isEdit = false.  

но если мы нажимаем на editButton возле заметки (в nodeList), то isEdit = true, срабатывает getEditingNote, в него передаётся текущая заметка и эта заметка поднимается наверх в app.tsx, передаётся в create.tsx как editingNote и её значение встаёт в textarea.  
по сути getEditingNote и editingNote существуют для того, чтобы когда isEdit = true в textarea подставлялся текст нашей изменяемой заметки

**ВАЖНО:**  
если isEdit = false, то в editButton передаётся getEditingNote, а если true, то getEditedNote.
  
nodelist.tsx:  
сюда передаём switchEditMode, isEdit , getEditingNote, объект editedNote   
<i>щас будет посложннее:</i>  
сюда мы из шага 1 передали массив объектов. в переборе через map мы отдельно взятый объект передаём через props в компонент Note и называем этот пропс note.
также передаём функцию getEditingMode  
note.tsx:
передаём switchEditMode, note, getEditingNote в editButton
  
editButton.tsx:  
ход работы кода  когда isEdit = false:   
 
<!-- при клике текущая заметка (объект) будет возвращаться в app.tsx   -->  
**кликаем  
**isEdit === true  
app.tsx:  
сработала функция getEditingNote > сработал setEditingNote > в create.tsx передаётся editingNote > срабатывает условие:  
  useEffect(()=>{  
          if(isEdit) {  
              setNote({...note, content: editingNote.content})  
          }  
          else {  
              setNote({...note, content: ''})  
          }  
      },[isEdit])  
B textarea note.content = editingNote.content

ход работы кода  когда isEdit = true
срабатывает getEditedNote, изменённая заметка летит в app.tsx, передаётся в nodelist.tsx и мы пытаемся вставить её в массив.  








грубо говоря при клике на editButton app берёт note из notelist, передаёт в create, там оно вставляется в textarea затем при повторном нажатии editButton изменённный note  летит в app, app отдаёт изменённый note  в notelist и notelist вырисовывает новый изменённый массив













node.tsx:
передаём компоненте editButton.tsx isEdit и switchEditMode через props

editButton.tsx:
ключевая строчка на самой кнопке - onClick={()=>switchEditMode(!isEdit)}.

и в итоге при нажатии на кнопку опять же выполнение кода переходит на app.tsx, там мы меняем состояние isEdit и перерисовываем все компоненты где он используется.

как происходит редактирование заметки КОНЕЦ
<!-- ------------------------------------------------------------------------------------ -->






```
