import {getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {db} from "../firebase/config"
import {useState, useEffect} from "react"

export const useAuthentication = () =>{

    const[error, setError] = useState(null)
    const[loading, setLoading] = useState(null)
    const[registered, setRegistered] = useState(false)
    
    //cleanup/ memoryleak
    const [cancelled, setCancelled]= useState(false)

    //auth el ref
    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    //Sing Up
    const createUser = async (data) =>{
        checkIfIsCancelled()
        setLoading(true)

        try {
           const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password)

           await updateProfile(user, {
            displayName: data.name
           })

           setLoading(false)
           setRegistered(true)

            
        } catch (error) {
            console.log(error)
         
            let systemErrorMessage

            if(error.message.includes('Password')){
                systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres!'
            } else if(error.message.includes('email-already')){
                systemErrorMessage = 'E-mail ja cadastrado!'
            }
            else if(error.message.includes('invalid-email')){
                systemErrorMessage = 'E-mail invalido!'
            }
            else{
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde!"
            }

            setLoading(false)
            setError(systemErrorMessage)


            
        }
      

    }

    //Sign In
    const login = async (data) =>{
        checkIfIsCancelled()
        setLoading(true)

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)


            
        } catch (error) {
            console.log(error)

            let systemErrorMessage

            if(error.message.includes('invalid-login')){
                systemErrorMessage = 'Usuario ou senha incorreto(s)'

            } 
            else{
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde'
            }
            setError(systemErrorMessage)
            setLoading(false)
            
        }

    }

    //Sign Out
    const logout = async () =>{
        checkIfIsCancelled()
        signOut(auth)
    }

    useEffect(() =>{
        return () => setCancelled(true)
    }, [])

    return { createUser, error, loading, registered, setRegistered, login, logout}
}