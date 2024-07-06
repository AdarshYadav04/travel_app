import { useEffect, useState ,useRef} from "react";
import axios from "axios";
import DateSelector from "../DateSelector/DateSelector";
import "./SearchStayWithDate.css";
import { useDate } from "../../Context/date-context";
import { useCategory } from "../../Context/category-context";
import { useNavigate } from "react-router-dom";


const SearchStayWithDate = () => {
  const [hotels, setHotels] = useState([]);
  const { checkInDate,checkOutDate,destination, guests, isSearchResultOpen, dateDispatch ,isSearchModalOpen } = useDate();
  const { hotelCategory } = useCategory();

  const navigate = useNavigate();
       
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3500/api/hotels?category=${hotelCategory}`
        );
        setHotels(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [hotelCategory]);

  const handleDestinationChange = (event) => {
    dateDispatch({
      type: "DESTINATION",
      payload: event.target.value,
    });
  };

  const handleGuestChange = (event) => {
    dateDispatch({
      type: "GUESTS",
      payload: event.target.value,
    });
  };

  const handleSearchResultClick = (address) => {
    dateDispatch({
      type: "DESTINATION",
      payload: address,
    });
  };

  const handleDestinationFocus = () => {
    dateDispatch({
      type: "SHOW_SEARCH_RESULT",
    });
  };

  const handleSearchButtonClick = () => {
    
    if(checkInDate && checkOutDate && guests && destination){
        dateDispatch({
            type: "CLOSE_SEARCH_MODAL"
          });
        navigate(`/hotels/${destination}`);
    }
    else{
        alert("Fill the required details")
    }
    
  };

  const handleSearchCloseClick = () => {
    dateDispatch({
      type: "CLOSE_SEARCH_MODAL"
    })
  }

  const destinationOptions = hotels.filter(
    ({ address, city, state, country }) =>
      address.toLowerCase().includes(destination.toLowerCase()) ||
      city.toLowerCase().includes(destination.toLowerCase()) ||
      state.toLowerCase().includes(destination.toLowerCase()) ||
      country.toLowerCase().includes(destination.toLowerCase())
  );

  const handleRefClick=(event)=>{
    if(isSearchModalOpen  && !searchRef.current.contains(event.target)){
        dateDispatch({
            type:"OPEN_SEARCH_MODAL"
        })
    }
    
}

  const searchRef=useRef()
    useEffect(()=>{
        document.addEventListener("mousedown",handleRefClick)
        return ()=>{
            document.removeEventListener("mousedown",handleRefClick)
        }
    },[isSearchModalOpen])
 
  


  return (
    
    <div className="destination-container">
      <div ref={searchRef}>
      <div  className="destionation-options d-flex align-center absolute">
        <div className="location-container">
          <label className="label">Where</label>
          <input
            value={destination}
            onChange={handleDestinationChange}
            onFocus={handleDestinationFocus}
            className="input search-dest"
            placeholder="Search Destination"
            autoFocus
          />
        </div>
        <div className="location-container">
          <label className="label">Check in</label>
          <DateSelector checkInType="in" />
        </div>
        <div className="location-container">
          <label className="label">Check out</label>
          <DateSelector checkInType="out" />
        </div>
        <div className="location-container">
          <label className="label">No. of Guests</label>
          <input
            value={guests}
            className="input search-dest"
            placeholder="Add guests"
            onChange={handleGuestChange}
          />
        </div>
        <div
          className="search-container d-flex align-center cursor"
          onClick={handleSearchButtonClick}
        >
          <span className="material-icons-outlined">search</span>
          <span>Search</span>
        </div>
        <button className="button absolute close-search-dest">
            <span onClick={handleSearchCloseClick} className="highlight material-icons-outlined">highlight_off</span>
        </button>
      </div>
      {isSearchResultOpen && (
        <div className="search-result-container absolute">
          {destinationOptions &&
            destinationOptions.map(({ address, city }) => (
              <p
                className="p cursor-pointer"
                onClick={() => handleSearchResultClick(address)}
              >
                {address}, {city}
              </p>
            ))}
        </div>
      )}
      </div>
    </div>

  );
};

export default SearchStayWithDate