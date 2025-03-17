
export const useRemoveItem = (data, newAmount) =>{

    let productData = {
        name: data.name,
        price: data.price,
        id: data.id,
        URLimage: data.URLimage,
        key: data.key,
        size: data.size,
        amount: Number.parseInt(newAmount)
      }

      return {productData}


}