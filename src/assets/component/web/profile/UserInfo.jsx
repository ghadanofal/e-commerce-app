import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/User';
import Loeader from '../loader/Loeader';

export default function UserInfo() {
  let { userToken, userData, setUserData, loading } = useContext(UserContext);

  console.log(userData)
  
  if(loading){
    return <Loeader></Loeader>
  }
  return (
    <div className='text-center'>
    <h1 className='m-2'>Info of {userData.userName}</h1>
   
<img src={userData.image.secure_url} alt="" className='person mt-3' />
<h2 className='fs-3 mt-3'>{userData.userName}</h2>
<p>Email : {userData.email}</p>
   
    </div>
  )
}
