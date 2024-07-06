import { createContext, useContext, useReducer } from "react";
import dateReducer from "../reducer/date-reducer";

const initialState={
    checkInDate:null,
    checkOutDate:null,
    isSearchModalOpen:false,
    destination:"",
    guests:0,
    isSearchResultOpen:true

}
const DateContext=createContext(initialState)
const DateProvider=({children})=>{
    const[{checkInDate,checkOutDate,isSearchModalOpen,destination,guests,isSearchResultOpen},dateDispatch]=useReducer(dateReducer,initialState)

    return(
        <DateContext.Provider value={{checkInDate,checkOutDate,isSearchModalOpen,destination,guests,isSearchResultOpen,dateDispatch}}>
            {children}
        </DateContext.Provider>
    )

}

const useDate=()=>useContext(DateContext)
export {useDate,DateProvider}