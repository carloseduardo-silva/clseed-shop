import { db } from "../firebase/config"
import {collection, query, orderBy, getDocs, where } from "firebase/firestore"
import { useEffect, useState } from "react"

export const useFetchCollection = (docCollection) =>{
    
    //states
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')

    //deal with memory leak
    const[cancelled, setCancelled] = useState(false)


    //query + assync exibition of products on home
       

        const loadData = async (search) =>{

            if (cancelled) return

            setLoading(true)

            let docsArr = []

            try {

                let q;
               

                if (search) {

                    q =  query(collection(db, docCollection), where("queryName", "array-contains", search))
                    
                } 
        
                else{
                        q =  query(collection(db, docCollection), orderBy('idProduct'))
                }

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    
                    
                    docsArr.push(doc.data())
                    
                    
                });

                setLoading(false)
                

            } catch (error) {
                console.log(error.message)
                setError(error.message)

                setLoading(false)
            }

            console.log(docsArr)
            return { docsArr }
        }
            
        

    // memory leak
    useEffect(() =>{
        return () => setCancelled(true)
    },[])


    //return
    return {loadData}
}