import { createContext, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

const AuthContext = createContext<{
  session: Session | null;
  isLoading: boolean;
}>({
  session: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) { // потом разберёмся как тут параметры работают
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Получаем начальную сессию
    //не async await потму что это оч сильно усложнит
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
      console.log('get');
      
    });

    // Слушаем изменения
    const {data: {subscription} } = supabase.auth.onAuthStateChange((_event, session) => {
      if(_event !== 'INITIAL_SESSION') {
        setSession(session);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

/* 
порядок выполнения:
1. supabase.auth.onAuthStateChange (выполняется быстрее, тк запросы к бд асинхронны)
2. supabase.auth.getSession() (выполнился, сменился session)
3. supabase.auth.onAuthStateChange  (сработал на изменение (лишний ращз))

когда сессия уже определена - событие на onAuthStateChange (состояние сессии) выглядит как initial_session. и я написал что если сессия уже определена (getSession.then сработал), то мы ничего не делаем
(просто -1о лишнее действие)
*/
