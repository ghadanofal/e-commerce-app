import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { UserContext } from '../context/User'
import { Link, Outlet } from 'react-router-dom'
import './profile.css';
export default function Profile() {


    let { userData,setUserData, loading} = useContext(UserContext)

    
    console.log(userData)
    

  return (
    <>
 <div className="sidebar">
        <h1>Profile</h1>
        <ul>
           
            <li><Link to ="info">Info</Link></li>
           
            <li><Link to="contact">Contact</Link></li>
            <li><Link to="order">Orders</Link></li>
        </ul>
    </div>

    <div className="content">
        <Outlet/>
    </div>
    </>

  )
}
