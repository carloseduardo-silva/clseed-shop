import { createContext, useContext } from "react";

export const CounterContext = createContext()

export const CounterContextProvider = ({children, value}) =>{
    
    return(<CounterContext.Provider value={value}>
        {children}
    </CounterContext.Provider>)

}
export function counterShoppingCart(){
    return useContext(CounterContext)
}