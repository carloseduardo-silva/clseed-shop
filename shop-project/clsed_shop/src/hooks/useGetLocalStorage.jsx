
export const useGetLocalStorage = () =>{
    let datas = []

    for (let counter = 1; counter < 10; counter++) {
        if (localStorage.getItem(`${counter}`)){
            datas.push(localStorage.getItem(`${counter}`))
        } 
    }


    return {datas}
}