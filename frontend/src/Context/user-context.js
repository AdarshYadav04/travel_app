import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const UserContext=createContext()


const UserProvider=({children})=>{
    const [user,setUser]=useState()
    const navigate=useNavigate()
    
    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
        if(!userInfo){
            navigate("/")
        }
        
    },[navigate])
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

const useUser=()=>useContext(UserContext)

export {useUser,UserProvider}