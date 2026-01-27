import { useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import styles from "./auth.module.css"
import Spinner from "./spinner/spinner";
function Auth() {
    const [email, setEmail] = useState<string>('');      // Храним введённый email
    const [password, setPassword] = useState<string>(''); // Храним введённый пароль
    const [isLogin, setIsLogin] = useState<boolean>(true); // Режим: вход или регистрация?
    const [loading, setLoading] = useState<boolean>(false); // Идёт загрузка?
    const [message, setMessage] = useState<string>('');   // Сообщения об ошибках/успехе
    
    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
      e.preventDefault(); // 1. Предотвращаем перезагрузку страницы
      setLoading(true);   // 2. Показываем "Загрузка..."
      setMessage('');     // 3. Очищаем предыдущие сообщения
    
      try {
        if (isLogin) {
          // 4. ВХОД по email и паролю
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error; // Если ошибка - переходим в catch
        } else {
          // 5. РЕГИСТРАЦИЯ по email и паролю
          const { error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) throw error;
          setMessage('Подвердите вашу электронную почту.');
        }
      } 
      catch(error) {
        if(error instanceof Error) {

          if (error.message.includes('Invalid login credentials')) {
            setMessage('Неверный email или пароль');
          }
    
          else if (error.message.includes('email not confirmed')) {
            setMessage('Подтвердите ваш email')
          }
          
          else if (error.message.includes('user already registered')) {
            setMessage('Пользователь с таким email уже существует')
          }
          
          else if (error.message.includes('password should be at least')) {
            setMessage('Пароль должен быть не менее 6 символов')
          }
          
          else if (error.message.includes('too many requests')) {
            setMessage('Слишком много попыток. Попробуйте позже')
          }
          
          else {
            setMessage('какая-то ошибка(')
          }
        }
      } 
      finally {
    // 7. В ЛЮБОМ СЛУЧАЕ
    setLoading(false); // Скрываем "Загрузка..."
  }
}
    return (
        <>
    <div className={styles.overlay}></div>
    <div className={styles.container}>
    {/* Заголовок меняется в зависимости от режима */}
    <h2 className={styles.title}>{isLogin ? 'Вход' : 'Регистрация'}</h2>
    
    {/* Форма отправляет данные в handleSubmit */}
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Поле для email */}
      <input
        type="email"
        placeholder="Email"
        value={email}                 // Что отображать
        onChange={(e) => setEmail(e.target.value)} // Меняем состояние при вводе
        required                      // Обязательное поле
        className={styles.input}
      />
      
      {/* Аналогично для пароля */}
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.input}
      />
      
      {/* Кнопка меняет текст в зависимости от состояния */}
      <button type="submit" disabled={loading} className={styles.button}>
        {
        loading ? 
        <div className={styles.loadingStatus}>
          <span>Загрузка...</span>
          <Spinner />
        </div>
        : (isLogin ? 'Войти' : 'Зарегистрироваться')
        }
      </button>
    </form>
    
    {/* Показываем сообщения (ошибки или подтверждение) */}
    {message && <p className={styles.message}>{message}</p>}
    
    {/* Кнопка переключения между входом и регистрацией */}
    <button className={styles.hasAccount} onClick={() => {
      setIsLogin(!isLogin)
      setEmail('')
      setPassword('')
    }}>
      {isLogin ? 
      <>
      <span className={styles.hasAccount}>Нет аккаунта? </span>
      <span className={styles.makeAction}>Зарегистрироваться</span>
      </>  
      :
      <>
      <span className={styles.hasAccount}>Есть аккаунт? </span>
      <span className={styles.makeAction}>Войти</span>
      </>  }
    </button>

    {/* Кнопки входа через социальные сети */}
    <div className={styles.socialButtons}>
      <button className={styles.socialLogin} onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}>
        <img src="src/assets/icons/google.png" alt="google" className={styles.socialImg}/>
        <span className={styles.socialText}>Войти через Google</span>
      </button>
      <button className={styles.socialLogin} onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}>
        <img src="src/assets/icons/github.png" alt="github" className={styles.socialImg}/>
        <span className={styles.socialText}>Войти через GitHub</span>
      </button>
    </div>
  </div>
        </>
    )
}
export default Auth