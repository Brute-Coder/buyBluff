import React, { createContext, useContext, useReducer } from 'react'
const  CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state , action)=>{
 switch(action.type){
    case "ADD":
        return [...state,{id:action.id,name:action.name,img:action.img, 
                 price:action.price,qty:action.qty,size:action.size}]
    case "REMOVE":
        let newState = [...state]
        newState.splice(action.index,1)
        return newState;
    case "UPDATE":
        let copyState = [...state]
        copyState.find((item,index)=>{
            if(item.id === action.id){
                copyState[index] = {...item,qty:parseInt(action.qty)+parseInt(item.qty),price:action.price+item.price}
            }
            return copyState
        })
        return copyState
    default:
        return ("error in dispatch")
 }
}
export const CartProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,[])
   return (
     <CartDispatchContext.Provider  value={dispatch}>
        <CartStateContext.Provider value={state}>
            {children}
        </CartStateContext.Provider>
     </CartDispatchContext.Provider>
   )
}

export const useCart = ()=>useContext(CartStateContext);
export const useDispathCart = () => useContext(CartDispatchContext);
