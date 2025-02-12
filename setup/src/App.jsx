import { Routes,Route } from "react-router-dom"
import AverageDeliveryTime from "./Pages/Average-delivery-time"
import NumberOfShipments from "./Pages/Number-of-shipments"
import PerfectOrderRate from "./Pages/Perfect-order-rate"
import ShippingTime from "./Pages/Shipping-time"
import TransportationCost from "./Pages/Transportation-cost"
import PageNotFound from "./Pages/PageNotFound"

function App() {
  return (
    <Routes>
      <Route path='/average-delivery-time' element={<AverageDeliveryTime/>}/>
      <Route path='/number-of-shipments' element={<NumberOfShipments/>}/>
      <Route path='/' index element={<PerfectOrderRate/>}/>
      <Route path='/shipping-time' element={<ShippingTime/>}/>
      <Route path='/transportation-cost' element={<TransportationCost/>}/>
      <Route path='*' element ={<PageNotFound/>}/>
    </Routes>
  )
}

export default App
