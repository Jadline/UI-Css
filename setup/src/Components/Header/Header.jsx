import './Header.css'
import { useLocation } from 'react-router-dom'
function Header ({className}){

    const location = useLocation()
    const mainPages = {
        "/": "Perfect Order Rate",
        "/average-delivery-time": "Average Delivery Time",
        "/number-of-shipments": "Number of Shipments",
        "/shipping-time": "Shipping Time",
        "/transportation-cost": "Transportation Cost",
    };
    const pageTitle = mainPages[location.pathname] || "";
    return(
        <header className={className}>
            <p>Rolling Cargo Shipping Co.</p>
            {pageTitle && <h1>{pageTitle}</h1>}
            <h2>Search bar</h2>
            <p>Settings</p>
            <p>notifications</p>
            <p>profile</p>
        </header>
    )
}
export default Header