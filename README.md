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

```md
как работает этот проект:
по классике index.html>main.tsx>app.tsx.

что рисуется:
у нас в app.tsx  возвращается 4 компонента:
header, search, create, nodelist
<!-- isEdit - переменная состояния режима редактирования заметки. может быть true/false
если isEdit === false, то  мы рисуем header, search, nodelist. 
если жн он true, то рисуем create только create. -->
**********************************************************************************
как заметка попадает в nodeList и где она делается НАЧАЛО:

в app.tsx:
в app.js объявлен хук useState для nodeArr и setNodeArr. nodeArr - массив строк (текстов заметок).nodeArr передаётся в nodelist (по умолчанию пустой)
также объявлена функция pushNode, принимающая параметром текст заметки и заносящая его в массив.
эту функцию мы передаём через props в компонент create и даём ей уже название onButtonClick
в компоненте create мы её принимаем.

в create.tsx:
объявили хук useState для value и setValue. value - значение textarea. у неё в атрибуте value как раз присвоено то value, которое мы объявили через хук.
также объявлена функция changeValue, которая срабатывает на событие onChange в textarea и присваивает value из хука актуальное значение value (то что в данный момент написано в textarea (event.target.value)). затем это value из хука подставляется в атрибут value в textarea и в нём лежит актуальное значение. теперь у нас value из хука = value из textarea

при нажатии на кнопку текст из value (без разницы какого) каким-то образом должен попадать в массив nodeArr. для этого мы передали в create.tsx функцию onButtonClick (pushNode), которая может засунуть текст, переданный параметром в массив nodeArr. 
и вот на кнопке при событии onClick будет срабатывать функция onButtonClick, c параметром value, которая засунет value в массив (ну и также второй строчкой там очищается value textarea для красоты). выполнение кода на этом моменте переходит назад в app.tsx, тк функция pushNode (onButtonClick) находится там

nodelist.tsx:
мы помним, что в nodelist при перерисовке контента передаётся пропс nodeArr. а так как до этого выполнилась функция pushNode - она обновила состояние переменной nodeArr и все компоненты, использующие nodeArr перерисуются => в nodeList сейчас лежит уже не пустой массив, а с одной заметкой. там мы если он пустой - пишем создайте первую заметку, а если не пустой, то делаем nodeArr.length заметок (компонент node.tsx) и вставляем их в код через метод массива map.   

node.tsx:
просто разметка заметки с отдельно вынесенной компонентой editButton.tsx

editButton.tsx:
кнопка для редактирования заметки. я её вынес, чтобы реализовать возможность редактирования заметок.

как заметка попадает в nodeList и где она делается КОНЕЦ
***********************************************************************************

-----------------------------------------------------------------------------------
как происходит редактирование заметки НАЧАЛО

app.tsx:
создали переменную состояния isEdit, по умолчанию имеющую значение false, отвечающую за то активен ли сейчас режим редактирования. если она true - то он активен.
когда мы рисуем компоненты, то ставим условие {!isEdit && component}, которое покажет компонент если isEdit имеет значение false. затем мы прокидываем её в create.tsx и там если она false, то под textarea будет кнопка 'добавить', а если true - то кнопка с значком редактирования (editButton.tsx), которой мы передаём функцию switchEditMode, (переключатель режима редактирования) и isEdit (текущий режим)

то же самое и с nodeList. тоже передаём туда switchEditMode и isEdit для node.tsx (в котором лежит editButton.tsx)

node.tsx:
передаём компоненте editButton.tsx isEdit и switchEditMode через props

editButton.tsx:
ключевая строчка на самой кнопке - onClick={()=>switchEditMode(!isEdit)}.

и в итоге при нажатии на кнопку опять же выполнение кода переходит на app.tsx, там мы меняем состояние isEdit и перерисовываем все компоненты где он используется.

как происходит редактирование заметки КОНЕЦ
------------------------------------------------------------------------------------






```
