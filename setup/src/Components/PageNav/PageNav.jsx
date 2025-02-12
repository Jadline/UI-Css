import { Link } from "react-router-dom"
import './PageNav.css'
function PageNav({className}){
    return(
        <nav className={className}>
            <Link to='/'>Dashboard</Link>
            <Link to='/average-delivery-time'>Average Delivery Time</Link>
            <Link to='/number-of-shipments'>Number of Shipments</Link>
            <Link to='/'>Perfect Order Rate</Link>
            <Link to='/shipping-time'>Shipping Time</Link>
            <Link to='/transportation-cost'>Transportation Cost</Link>
            <p>Settings</p>
        </nav>
    )
}
export default PageNav