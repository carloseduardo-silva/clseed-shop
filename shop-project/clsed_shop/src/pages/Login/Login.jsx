import {useState} from 'react'
import { Link } from 'react-router-dom'

//css
import styles from "./Login.module.css"

//components
import Nav from '../../components/Nav'
import { useAuthentication } from '../../hooks/useAuthentication'



const Login = () => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  //hook useAuthentication
  const {login, error: authError, loading} = useAuthentication()

  const [error, setError] = useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError('')

    const user ={
      email,
      password,
    }

    const res = await login(user)
    setError(authError)
    

  }

 

  return (
    <>
      <Nav/> 

      <div className={styles.form_container}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input onChange={(e) =>{setEmail(e.target.value)}} name='email' placeholder='Digite seu E-mail' type="email" />
        
        <input onChange={(e) =>{setPassword(e.target.value)}} name='password' placeholder="Digite sua senha" type="password" />


        <button type='submit'>Entrar</button>
        <Link to={'/register'}> <span> Criar Conta</span></Link>
        {error && <p className='error'>{error}</p>}
      </form>


      </div>



      
    </>
  )
}

export default Login
