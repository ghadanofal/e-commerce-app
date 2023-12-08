import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { CartContextProvider } from "./assets/component/web/context/Cart.jsx"
// import UserContextProvider from "./assets/component/web/context/User.jsx"
import { router } from "./assets/layouts/routes.jsx"
import { UserContext } from './assets/component/web/context/User.jsx';



function App() {
    let {setUserToken} = useContext(UserContext)

    useEffect(()=>{
    if(localStorage.getItem("userToken") !=null){
        setUserToken(localStorage.getItem("userToken"));
    }
    },[])

    return (
        
        <CartContextProvider>
        <RouterProvider router={router} />
        </CartContextProvider>
        
    )
}

export default App


