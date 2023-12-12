import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/User';

export default function UserInfo() {
  let { userToken, userData, setUserData, loading } = useContext(UserContext);

  console.log(userData)
  
  if(loading){
    return <h2>loading...</h2>
  }
  return (
    <div className='text-center'>
    <h1>UserInfo</h1>
    <h2 className='fs-3'>{userData.userName}</h2>
<p>{userData.email}</p>
<img src={userData.image.secure_url} alt="" />
   
    </div>
  )
}
