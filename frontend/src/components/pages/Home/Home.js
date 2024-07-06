import Categories from "../../Categories/Categories";
import Navbar from "../../Navbar/Navbar";
import HotelCard from "../../HotelCard/HotelCard";
import SearchStayWithDate from "../../SearchStayWithDate/SearchStayWithDate";
import AuthModal from "../../AuthModal/AuthModal";
import { ProfileDropDown } from "../../ProfileDropDown/ProfileDropDown";

import {useEffect, useState } from "react";
import { useCategory } from "../../../Context/category-context";
import { useDate } from "../../../Context/date-context";
import { useAuth } from "../../../Context/auth-context";


import "./home.css"
import axios from "axios";
const Home=()=>{
    const[hotels,setHotels]=useState([])
    const{hotelCategory}=useCategory()
    const {isSearchModalOpen}=useDate()
    const {isAuthModalOpen,isDropDownModalOpen}=useAuth()
    
    useEffect(()=>{
        
        const showHotels=async()=>{
            try {
                const {data}=await axios.get(`http://localhost:3500/api/hotels?category=${hotelCategory}`)
                setHotels(data)
                
            } catch (error) {
                console.log(error)
                
            }
            
        }
        showHotels()
    
    },[hotelCategory])
    return (
        <div className="relative">
            <Navbar/>
            <Categories/>
            <main className="main d-flex align-center wrap gap-larger">
                {
                hotels.map(hotel=>{
                    return(
                        <HotelCard key={hotel._id} hotel={hotel}/>
                    )
                })
            }
            </main>
            {isSearchModalOpen && <SearchStayWithDate/>}
            {isAuthModalOpen && <AuthModal/>}
            {isDropDownModalOpen &&<ProfileDropDown/>}
        </div>
    )
}

export default Home