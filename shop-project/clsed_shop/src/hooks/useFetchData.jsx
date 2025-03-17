import { db } from "../firebase/config"
import {collection, query, orderBy, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

export const useFetchData = (docCollection, search=null, idProduct) =>{

    //states
    const [data, setData] = useState('')
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const [image, setImage] = useState('')

    //deal with memory leak
    const[cancelled, setCancelled] = useState(false)


    //query
    useEffect(()=>{
        
        const loadData = async () =>{
            if (cancelled) return

            setLoading(true)

            try {

                let q;
               

                if (search) {
                    
                } 
                else{
                    q = query(collection(db, 'products'), orderBy('idProduct'))
                }

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                
               //filtering the product through of the id
                if( doc.data().idProduct == idProduct){
                    setData(doc.data())
                    let datas = doc.data()
                    let arr = datas.CarrouselIMG
                    setImage(arr[0])
                  }
                    
                   
                });

                setLoading(false)
                

            } catch (error) {
                console.log(error)
                setError(error.message)

                setLoading(false)
            }
        }

        loadData()
    }, [docCollection, cancelled, search])



    // memory leak
    useEffect(() =>{
       
        return () => setCancelled(true)
    },[])


    //return
    return {data, loading, error, image}
}