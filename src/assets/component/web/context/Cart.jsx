import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null)

export function CartContextProvider({children}){

    let [count, setCount] = useState(0)

    const addToCartContext = async(productId)=>{
console.log(productId)
        try{
            const token = localStorage.getItem("userToken")
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
            {productId},
            {
                headers:{Authorization: `Tariq__${token}`}
            }
            )
            console.log(data)
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
            setCount(++count)
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
        console.log(data.count)
        setCount(data.count)
        
        return data
        
    }

    const removeCartContext = async(productId)=>{
        try{const token = localStorage.getItem('userToken')
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
        { productId }, 
        {headers: {Authorization: `Tariq__${token}`}})
        setCount(data.products)
        setCount(--count)
        return data
    }catch(error){
        console.log(error)
    }
}
    return <CartContext.Provider value={{addToCartContext, getCartContext, removeCartContext, setCount, count}}>
        {children}
    </CartContext.Provider>
}