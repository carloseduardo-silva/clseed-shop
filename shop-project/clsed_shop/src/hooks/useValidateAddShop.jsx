
export const useValidateAddShop = (product, datas) =>{
    
    let productsArr = []
    let productInfo = product.id + product.size

    datas.map((data) =>(
        
       productsArr.push(
         JSON.parse(data).id + JSON.parse(data).size
       )
       
    ))
    
    //validate if exists a product with the same Size and Id
    if(productsArr.includes(productInfo)){
        return true
    }
    else{
        return false
    }
  

    
}