import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

//css
import styles from "./Register.module.css"

//components
import Nav from '../../components/Nav'

//hooks
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    //hook de autenticação
    const {createUser, error:authError, loading, registered, setRegistered} = useAuthentication()

    const [error, setError] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError('')

       
        if(password !== confirmPassword){
            setError("As senhas precisam ser iguais!")
            return 
        }

       if(name && email && password && confirmPassword){
        const user = {
          name,
          email,
          password,}

        const res = await createUser(user)
       }
       else{
        setError("Preencha os campos corretamente")
       }

    }

    //after hook authetication
    //clean inputs
    useEffect(()=>{
        if (registered){
          setTimeout(() =>{
            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setRegistered(false)
            
          }, 2000)} 

    }, [registered])

    //errors
    useEffect(()=>{

        if(authError){
        setError(authError)
    } 

    }, [authError])


  return (
    <>
    <Nav/> 

    <div className={styles.form_container}>
    <h1>Crie sua Conta</h1>

    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) =>{setName(e.target.value)}} name='name' placeholder='Digite seu Nome' type="text" />

      <input value={email} onChange={(e) =>{setEmail(e.target.value)}} name='email' placeholder='Digite seu E-mail' type="email" />
      
      <input value={password} onChange={(e) =>{setPassword(e.target.value)}} name='password' placeholder="Digite sua senha" type="password" />

      <input value={confirmPassword} onChange={(e) =>{setConfirmPassword(e.target.value)}} name='password' placeholder="Confirme sua senha" type="password" />


      {!loading && <>
      <button disabled={loading ? true : false} className="btn">{loading ? "Carregando..." : "Criar Conta" }</button> 
      <Link to={'/login'}>Voltar</Link>
      </>
      }
      {loading && <button disabled className="btn">Aguarde ...</button> }
      {error && <p className="error"> {error}</p>}
      {registered && <p className={styles.registered}> Cadastro Confirmado!</p>}
    </form>


    </div>



    
  </>
  )
}

export default Register
