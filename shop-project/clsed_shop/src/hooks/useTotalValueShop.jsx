
export const useTotalValueShop = (datas) =>{
    let totalValue = 0

    datas.map((data)=>(
        totalValue = ((JSON.parse(data).price * JSON.parse(data).amount ) + totalValue)
        
        ))

    return {totalValue}
}