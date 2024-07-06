import { Fragment, useState } from "react"
import Navbar from "../../Navbar/Navbar"
import axios from "axios"
import { useEffect } from "react"
import {  useParams } from "react-router-dom"
import HotelCard from "../../HotelCard/HotelCard"

const SearchResults=()=>{


    const[destinationsResults,setDestinationsResults]=useState([])
    const {address}=useParams()
    useEffect(()=>{
        
        (async()=>{
            
            try {
                if(address){
                    const {data}=await axios.get(`http://localhost:3500/api/results?destination=${address}`)
                    setDestinationsResults(data)

                }    
            } catch (error) {
                console.log(error)
                
            }
            
        })()   
    },[address])

    return(
        <Fragment>
            <Navbar/>
            <section className="main d-flex align-center gap-larger">
                {
                    destinationsResults ?
                    destinationsResults.map((hotel)=>(
                        <HotelCard key={hotel._id} hotel={hotel}/>
                    )):(
                        <h3>Nothing Found</h3>
                       )
                }

            </section>
            
        </Fragment>
    )
}

export default SearchResults