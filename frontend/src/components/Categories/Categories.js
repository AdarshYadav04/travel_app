import axios from "axios"
import "./Categories.css"
import {useEffect, useState } from "react"
import { useCategory } from "../../Context/category-context"

const Categories=()=>{
    const [categories,setCategories]=useState([])
    const[numberOfCategoryTOShow,setNumbeOfCategoryToShow]=useState(0)
    

    const handleShowMoreRightClick=()=>{
        setNumbeOfCategoryToShow(prev=>prev+10)

    }
    const{hotelCategory,setHotelCategory}=useCategory()
    const handleShowMoreLeftClick=()=>{
        setNumbeOfCategoryToShow(prev=>prev-10)

    }
    useEffect(()=>{
        const showCategories=async()=>{
            try {
                const {data}=await axios.get("http://localhost:3500/api/categories")
                
                const categoriesToShow=data.slice(numberOfCategoryTOShow+10>data.length?data.length-10:numberOfCategoryTOShow,
                numberOfCategoryTOShow>data.length?data.length:numberOfCategoryTOShow+10)
                setCategories(categoriesToShow)
                
            } catch (error) {
                console.log(error)
                
            }

        }
        showCategories()

    },[numberOfCategoryTOShow])

    const handleCategoryClick=(category)=>{
        
        
        setHotelCategory(category)
        
        
    }
    
    
    return (
        <section className="categories d-flex align-center gap-large cursor-pointer">
            { 
                numberOfCategoryTOShow>=10 && 
                    (<button className="button btn-category btn-left fixed cursor pointer" onClick={handleShowMoreLeftClick}>
                        <span class="material-symbols-outlined">chevron_left</span>
                    </button>)
            }
            
            {
                categories && categories.map(({_id,category})=><span className={`${category===hotelCategory?"border-bottom":""}`} onClick={()=>handleCategoryClick(category)} key={_id}>{category}</span>)
            }
            {
                numberOfCategoryTOShow-10 < categories.length &&
                (<button className="button btn-category btn-right fixed cursor pointer" onClick={handleShowMoreRightClick}>
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>)
            }

        </section>

    )
}
export default Categories