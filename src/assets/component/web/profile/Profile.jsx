import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { UserContext } from '../context/User'
import { Link, Outlet } from 'react-router-dom'
import './profile.css';
import { MdBorderColor } from "react-icons/md";
import { FaGift } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { MdOutlineContactPhone } from "react-icons/md";

export default function Profile() {


    let { userData,setUserData, loading} = useContext(UserContext)

    
    console.log(userData)
    

  return (
    <>
   
 <div className="sidebar">
        <h1>Profile</h1>
        <ul className='mt-4'>
           
            <li ><Link to ="info">Info </Link></li>
            <li className='my-4'><Link to="contact">Contact</Link></li>
            <li><Link to="order">Orders</Link></li>
        </ul>
    </div>

    <div className="content">
        <Outlet/>
    </div>
    </>

  )
}
