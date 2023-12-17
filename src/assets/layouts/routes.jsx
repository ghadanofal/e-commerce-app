import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../component/web/home/Home";
import Category from "../component/web/category/Category";
import HomeDashboard from "../component/dashboard/home/Home";
import CategoryDashboard from "../component/dashboard/category/Category";
import DashboardLayout from "./DashboardLayout";
import Register from "../component/web/register/Register";
import Login from "../component/web/log-in/Login";
import CategoryDetails from "../component/web/category/CategoryDetails";
import Product from "../component/web/product/Product";
import Cart from "../component/web/cart/Cart";
import ProtectedRoute from "../component/web/protectedRoute/ProtectedRoute";
import Authenticate from "../component/web/protectedRoute/Authenticate";
import ForgetPassword from "../component/web/forgetPassword/ForgetPassword";
import SendCode from "../component/web/sendCode/SendCode";
import Profile from "../component/web/profile/Profile";
import UserInfo from "../component/web/profile/UserInfo";
import UserContact from "../component/web/profile/UserContact";
import Orders from "../component/web/profile/Orders";
import CreateOrder from "../component/web/cart/CreateOrder";
import AllProducts from "../component/web/All-products/AllProducts";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children :[
            {
                path: '/',
                // index: true,
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
                element: 
                            <Login />
                        
            },
            {
                path: 'forget',
                element: <ForgetPassword/>
            },
            {
                path: 'sendcode',
                element: <SendCode/>
            },
            {
                path: 'profile',
                element: 
                <ProtectedRoute>
                    <Profile/> 
                </ProtectedRoute>,
               children:[
                {
                    path: 'info',
                    element: <UserInfo/>
                },
                {
                    path: 'contact',
                    element: <UserContact/>
                },
                {
                    path: 'order',
                    element: <Orders/>
                }
               ]
            },
            {
                path: '/products/category/:categoryId',
                element: <CategoryDetails/>
            },
            {
                path: '/product/:productId',
                element: <Product/>
            },
            {
                path: 'cart',
                element: <ProtectedRoute>
                            <Cart/>
                        </ProtectedRoute>,
                    
            },
            {
                path: '/cart/createorder',
                element:
                            <CreateOrder/>
                        
            },
            {
                path: '/products',
                element : <AllProducts/>
            },
            {
                path: '/products/:page',
                element : <AllProducts/>
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