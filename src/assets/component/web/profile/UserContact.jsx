import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import Loeader from '../loader/Loeader';

export default function UserContact() {
  let { userToken, userData, setUserData, loading } = useContext(UserContext);

  console.log(userData)
  
  if(loading){
    return <Loeader></Loeader>
  }
  return (
    <div>
    <h4>To Contact {userData.userName} </h4>
    
    <h5 className=''>Email :{userData.email}</h5>
    <h4> {userData.phone}</h4>
    </div>
  )
}
