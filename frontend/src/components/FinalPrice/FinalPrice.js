import "./FinalPrice.css"
import { useDate } from "../../Context/date-context"
import DateSelector from "../DateSelector/DateSelector"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/auth-context"
import { toast } from "react-toastify"
import { useUser } from "../../Context/user-context"


const FinalPrice=({singleHotel})=>{
    const navigate=useNavigate()
    const {price,rating,_id}=singleHotel
    const {guests,checkInDate,checkOutDate,dateDispatch}=useDate()
    const {accessToken}=useAuth()
    const {user}=useUser()
    const handleGuestChange=(event)=>{
        dateDispatch({
            type:"GUESTS",
            payload: event.target.value,
        })

    }
    const handleReserveClick=()=>{
        if(user || accessToken){
            navigate(`/confirm-booking/stay/${_id}`)
        }
        else{
            toast.warn('Please Login', {
                position: "bottom-right",
                autoClose: 5000,
                });
            
        }
        
    }
    const numberOfNights =checkInDate && checkOutDate? (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24): 0;
    return (
        <div className="price-details-container d-flex direction-column gap shadow">
            <div className="d-flex align-center justify-space-between">
                <p><span fs-bold fs-large>Rs. {price}</span>night</p>
                <span className="rating d-flex align-center">
                <span className="material-symbols-outlined">star </span>
                <span>{rating}</span>
                </span>
            </div>
            <div className="d-flex direction-column">
                <div className="grid-container-two-col selected-dates">
                    <div className="checkin loc-container">
                        <label className="label">Check in</label>
                        <DateSelector checkInType="in"/>
                    </div>
                    <div className="checkin loc-container">
                        <label className="label">Check out</label>
                        <DateSelector checkInType="out"/>
                    </div>
                </div>
                <div className="guests gutter-sm">
                    <p>GUESTS</p>
                    {
                        guests<=0?(<input className="guest-count-input" type="number" placeholder="Add Guests" value={guests} onChange={handleGuestChange}/>):(<span>{guests} guests</span>)
                    }
                    
                </div>
            </div>
            <div>
                <button className="button btn-reserve btn-primary cursor" onClick={handleReserveClick} disabled={checkInDate && checkOutDate && guests>0 ? false:true}>reserve</button>
            </div>
            <div className="price-distribution d-flex direction-column">
                <div className="final-price d-flex align-center justify-space-between">
                    <span className="span">Rs. {price} x {numberOfNights} nights</span>
                    <span className="span">Rs. {price*numberOfNights}</span>
                </div>
                <div className="final-price d-flex align-center justify-space-between">
                    <span className="span">Service fee</span>
                    <span>Rs. 200</span>
                </div>
                <div className="final-price d-flex align-center justify-space-between">
                    <span className="span">Total</span>
                    <span className="span">Rs. {price*numberOfNights+200}</span>
                </div>

            </div>
        </div>
    )
}
export default FinalPrice