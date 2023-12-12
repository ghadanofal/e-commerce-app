import React, { useContext } from 'react'
import { UserContext } from '../context/User';

export default function UserContact() {
  let { userToken, userData, setUserData, loading } = useContext(UserContext);

  console.log(userData)
  
  if(loading){
    return <h2>loading...</h2>
  }
  return (
    <div>
    <h4>There {userData.userName} Contact</h4>
    
    <h4 className=''>Email :{userData.email}</h4>
    <h4> {userData.phone}</h4>
    </div>
  )
}
