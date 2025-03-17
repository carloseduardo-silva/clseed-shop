import { db } from "../firebase/config"
import {collection, query, orderBy, getDocs, where } from "firebase/firestore"
import { useEffect, useState } from "react"

export const useFetchDatas = (docCollection, search=null) =>{

    //states
    const [datas, setDatas] = useState([])
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')

    //deal with memory leak
    const[cancelled, setCancelled] = useState(false)


    //query + assync exibition of products on home
        useEffect( () =>{

            const loadData = async (filter) =>{

                if (cancelled) return
    
                setLoading(true)
    
                try {
    
                    let q;
                    let docsArr = []
    
                    if (search) {
    
                        q =  query(collection(db, docCollection), where("queryName", "array-contains", search))
                        
                    } 
                   
        
                    else{
                         q =  query(collection(db, docCollection), orderBy('idProduct'))
                    }
    
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        
                     
                        docsArr.push(doc.data())
                        
                        setDatas(docsArr)
                    });
    
                    setLoading(false)
                    
    
                } catch (error) {
                    console.log(error.message)
                    setError(error.message)
    
                    setLoading(false)
                }
    
                
            }
            loadData()
        } ,[search])

        

       
    // memory leak
    useEffect(() =>{
        return () => setCancelled(true)
    },[])


    //return
    return {datas, loading, error}
}