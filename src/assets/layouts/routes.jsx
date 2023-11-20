import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../component/web/home/Home";
import Category from "../component/web/category/Category";
import HomeDashboard from "../component/dashboard/home/Home";
import CategoryDashboard from "../component/dashboard/category/Category";
import DashboardLayout from "./DashboardLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children :[
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'category',
                element :<Category/>
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