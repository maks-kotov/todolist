import './App.css'
import Notes from './components/Notes/notes.tsx'
import Auth from './components/Auth/auth.tsx'
import { useAuth } from './contexts/authContext.tsx'
import BigSpinner from './components/bigSpinner/bigSpinner.tsx'

function App() {
  // const [session, setSession] = useState<Session | null>(null)
  const {session, isLoading} = useAuth() // когда session меняется внутри AuthContext.Provider - тут происходит перерисовка

  return (
      <>
        {
        // если загрузка - показываем загрузку. если нет - то форму или заметки, взависимости от session
        isLoading ? <BigSpinner /> : !session ? <Auth /> :<Notes/>
        }
      </>
  )
}

export default App
