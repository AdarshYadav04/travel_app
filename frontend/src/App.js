import { Route, Routes } from "react-router";
import Home from "./components/pages/Home/Home";
import SingleHotel from "./components/pages/SingleHotel/SingleHotel";
import SearchResults from "./components/pages/SearchResults/SearchResults";
import Wishlist from "./components/pages/Wishlist/Wishlist";
import Payment from "./components/pages/Payment/Payment";
import { OrderSummary } from "./components/pages/OrderSummary/OrderSummary";
const App=()=> {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels/:name/:address/:id/reserve" element={<SingleHotel/>}/>
      <Route path="/hotels/:address" element={<SearchResults/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/>
      <Route path="/confirm-booking/stay/:id" element={<Payment/>}/>
      <Route path="/order-summary" element={<OrderSummary />} />
    </Routes>

  )
}

export default App;
