import { useEffect, useState } from 'react'
import './App.css'
import Notes from './components/Notes/notes.tsx'
import { supabase } from './lib/supabase.ts'
import type { Session } from '@supabase/supabase-js'
import Auth from './components/Auth/auth.tsx'

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(()=> {
    //1. при запуске устанавливем значение session
    supabase.auth.getSession().then(({data: { session }})=> {
      setSession(session)
    })
    //2. вешаем обработчик события который срабатывает когда меняется сессия (вышли из аккаунта, отчистили кэш) 
    const { data: {subscription}  } = supabase.auth.onAuthStateChange((event,sesion)=>{
      if(event !== "INITIAL_SESSION") { //внизу файла объяснение
        setSession(sesion)
      }
    })
    //3. если закрыть страницу - обработчик перестаёт следить за состоянием сессии. 
    return ()=> subscription.unsubscribe();
  },[])

  return (
      <>
        {!session ? <Auth /> : <Notes />}
      </>
  )
}

export default App

/* 
порядок выполнения:
1. supabase.auth.onAuthStateChange (выполняется быстрее, тк запросы к бд асинхронны)
2. supabase.auth.getSession() (выполнился, сменился session)
3. supabase.auth.onAuthStateChange  (сработал на изменение (лишний ращз))

когда сессия уже определена - событие на onAuthStateChange (состояние сессии) выглядит как initial_session. и я написал что если сессия уже определена (getSession.then сработал), то мы ничего не делаем
(просто -1о лишнее действие)
*/