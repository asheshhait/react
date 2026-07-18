import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const[cartIteam,setCartItem] = useState({})
    const addToCart = (itemId)=>{
        if(!cartIteam[itamId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId)=>{
        
           setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        
    }

    const contextValue = {
        food_list,
        cartIteam,
        setCartItem,
        addToCart,
        removeFromCart 
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};