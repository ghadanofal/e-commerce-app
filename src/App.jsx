// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { RouterProvider, createBrowserRouter} from "react-router-dom";
// import "./index.css";
// import Home from './assets/component/web/home/Home.jsx'
// import HomeDashboard from './assets/component/dashboard/home/Home.jsx'
// import {router} from './assets/layouts/routes.jsx'


import Layout from "./assets/layouts/Layout.jsx";
import Register from "./assets/component/web/register/Register.jsx";
import Login from "./assets/component/web/log-in/Login.jsx";
import Home from "./assets/component/web/home/Home.jsx";
import Category from "./assets/component/web/category/Category.jsx";
import DashboardLayout from "./assets/layouts/DashboardLayout.jsx";
import HomeDashboard from './assets/component/dashboard/home/Home.jsx';
import CategoryDashboard from './assets/component/dashboard/category/Category.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';


function App() {

    let [user, setUser] = useState(null)

    const SaveCurrentUser = ()=>{
        const token = localStorage.getItem("userToken");
        const decode = jwtDecode(token)
        setUser(decode)
    }

useEffect(()=>{
    if(localStorage.getItem("userToken")){
        SaveCurrentUser();
    }
},[])

    const router = createBrowserRouter([
            {
                path: "/",
                element: <Layout user={user} setUser={setUser}/>,
                children :[
                    {
                        path: '/',
                        // index : true,
                        element: <Home/>
                    },
                    {
                        path: 'category',
                        element :<Category/>
                    },
                    {
                        path: 'register',
                        element: <Register/>
                    },
                    {
                        path: 'login',
                        element: <Login SaveCurrentUser={SaveCurrentUser}/>
                    }
                ]
            },
            {
                path: '/dashboard',
                element: <DashboardLayout/>,
                children : [
                    {
                        path: 'home',
                        element:<HomeDashboard/>,
                    },
                    {
                        path :'category',
                        element: <CategoryDashboard/>,
                    }
                ]
            }
            ]);
    return (
        <RouterProvider router={router} />
    )
}

export default App


