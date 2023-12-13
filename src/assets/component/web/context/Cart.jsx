import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null)

export function CartContextProvider({children}){

    let [count, setCount] = useState(0)
    let [Loading, setLoading]= useState(true)

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
            setLoading(false)
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
        //setCount(data.count)
        setLoading(false)

        return data
        
    }

    const increaseQuantity = async (productId)=>{
        console.log(productId);
        try{
            const token = localStorage.getItem("userToken")
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
            {productId},
            {
                headers:{Authorization: `Tariq__${token}`}
            }
            )
            console.log(data)
            if(data.message=='success'){
                toast.success('product increase successfuly', {
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }  
            console.log(data.count)
           
            setLoading(false)
            return data
        }
        catch(error){
        console.log(error)
        }
    }


    const decreaseQuantity = async (productId)=>{
        console.log(productId);
        try{
            const token = localStorage.getItem("userToken")
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
            {productId},
            {
                headers:{Authorization: `Tariq__${token}`}
            }
            )
            console.log(data)
            if(data.message=='success'){
                toast.success('product decreased successfuly', {
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            
            setLoading(false)

            return data
        }
        catch(error){
        console.log(error)
        }
    }

    const removeAll = async()=>{
        try{const token = localStorage.getItem('userToken')
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
       {},
        {headers: {Authorization: `Tariq__${token}`}})
        setCount(data.count)
        setLoading(false)
        return data
    }catch(error){
        console.log(error)
    }
}



    const removeCartContext = async(productId)=>{
        try{const token = localStorage.getItem('userToken')
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
        { productId }, 
        {headers: {Authorization: `Tariq__${token}`}})
        setCount(data.products)
        setCount(--count)
        setLoading(false)
        return data
    }catch(error){
        console.log(error)
    }
}

let [orders, setOrder] = useState({})


const getOrder = async ()=>{

    const token = localStorage.getItem("userToken")
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/order`,
    {headers : {Authorization: `Tariq__${token}`}}
    )
    // console.log(data)
    
    //setCount(data.count)
    setOrder(data)

    return data
    

}


    return <CartContext.Provider value={{addToCartContext, 
    getCartContext,
     removeAll,
      removeCartContext, 
      setCount, 
      count,
       decreaseQuantity,
        increaseQuantity, 
        Loading, 
        orders,
         getOrder, 
        
         setOrder}}>
        {children}
    </CartContext.Provider>
}