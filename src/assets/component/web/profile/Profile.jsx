import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { UserContext } from '../context/User'

export default function Profile() {


    let { userData,setUserData} = useContext(UserContext)

    
    console.log(userData)

  return (
    <div className='text-center'>
        <h3>The Profile of  :{userData.userName}</h3>
        <p>Email : {userData.email}</p>
        <p>Rule : {userData.role}</p>
        <img src={userData.image.secure_url} alt="" />

    </div>

  )
}
