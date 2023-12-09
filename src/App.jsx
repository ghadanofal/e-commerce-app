import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom"
// import { CartContext, CartContextProvider } from "./assets/component/web/context/Cart.jsx"
// import UserContextProvider from "./assets/component/web/context/User.jsx"
import { router } from "./assets/layouts/routes.jsx"
import { UserContext } from './assets/component/web/context/User.jsx';
import { CartContext } from './assets/component/web/context/Cart.jsx';



function App() {
    let {setUserToken} = useContext(UserContext)
    let {count, setCount ,getCartContext} = useContext(CartContext)

    useEffect(()=>{
    if(localStorage.getItem("userToken") !=null){
        setUserToken(localStorage.getItem("userToken"));
        setCount(getCartContext().count);
    }
    },[])

    return (
        
        
        <RouterProvider router={router} />
       
        
    )
}

export default App


