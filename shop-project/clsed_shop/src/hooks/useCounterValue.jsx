
export const useCounterValue = (datas) =>{
    let arrKey = []

    datas.map((data) =>( arrKey.push(JSON.parse(data).key)))
    
    let counterValue = arrKey[arrKey.length-1]

    return {counterValue}
}