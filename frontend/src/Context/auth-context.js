import { createContext, useContext, useReducer } from "react"
import authReducer from "../reducer/auth-reducer"

const initialValue={
    isAuthModalOpen:false,
    isDropDownModalOpen: false,
    username:"",
    number:"",
    email:"",
    password:"",
    confirmPassword:"",
    accessToken:"",
    name:"",
    selectedTab:"login"
}

const AuthContext=createContext(initialValue)


const AuthProvider=({children})=>{
    const [{isAuthModalOpen,username,isDropDownModalOpen,number,email,password,confirmPassword,selectedTab,accessToken,name},authDispatch]=useReducer(authReducer,initialValue)
    return(
        <AuthContext.Provider value={{isAuthModalOpen,isDropDownModalOpen,username,number,email,password,confirmPassword,selectedTab,accessToken,name,authDispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth=()=>useContext(AuthContext)

export {useAuth,AuthProvider}