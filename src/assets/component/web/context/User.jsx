import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext()

export default function UserContextProvider({children}){

let [userToken, setUserToken] = useState(null)
let [userData, setUserData] = useState(null)
let [loading, setLoading] = useState(true)

const getUserData = async()=>{
    if(userToken){
       const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
    { headers:{authorization: `Tariq__${userToken}`}}) 
    console.log(data)
    setUserData(data.user)
    setLoading(false)
}
    
    
}
useEffect( ()=>{
    getUserData()
},[userToken])
    return <UserContext.Provider value={{userToken, setUserToken,  setUserData, loading, userData }}>
        {children}
    </UserContext.Provider>
}