

export const useSumAmount = (product, datas) =>{
    
    let productsArr = []
    let infoObj;
    
    datas.map((data) =>(
        
       productsArr.push({
        id: JSON.parse(data).id,
        size: JSON.parse(data).size,
        key: JSON.parse(data).key,
        lastAmount: JSON.parse(data).amount,
       })
       
    ))
        
        productsArr.map((obj) => {
            if (obj.id == product.id && obj.size == product.size) { 

                     infoObj = { 
                    key: obj.key,
                    lastAmount: obj.lastAmount}
                
            }
        })

        return {infoObj}
       
    }
  