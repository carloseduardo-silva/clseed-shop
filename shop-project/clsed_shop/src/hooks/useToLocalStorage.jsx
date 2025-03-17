
 export const useToLocalStorage = (shopDatas, counter) =>{
      

    localStorage.setItem(`${counter}`, JSON.stringify(shopDatas))
   
    
    let currentProduct = JSON.parse(localStorage.getItem(`${counter}`))
    
   
   
    if(currentProduct){
        return true
    }


    

}

