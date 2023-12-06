import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null)

export function CartContextProvider({children}){


    const addToCartContext = async(productId)=>{

        try{
            const token = localStorage.getItem("userToken")
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
            {productId},
            {
                headers:{Authorization: `Tariq__${token}`}
            }
            )
            if(data.message=='success'){
                toast.success('product added successfuly', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            return data
        }
        catch(error){
        console.log(error)
        }
        

    }

    const getCartContext = async ()=>{

        const token = localStorage.getItem("userToken")
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
        {headers : {Authorization: `Tariq__${token}`}}
        )
        return data
    }

    const removeCartContext = (productId)=>{
        try{const token = localStorage.getItem('userToken')
        const {data} = axios.patch(`${import.meta.env.VITE_API_URL}/cart`,
        {headers: {Authorization: `Tariq__${token}`}})
    }catch(error){
        console.log(error)
    }
}
    return <CartContext.Provider value={{addToCartContext, getCartContext, removeCartContext}}>
        {children}
    </CartContext.Provider>
}