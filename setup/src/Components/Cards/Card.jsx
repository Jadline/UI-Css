import './Card.css'
function Card({className}){
    return(
        <div className={`card-container ${className || ''}`}>
            <div className='card-item'>Total damages</div>
            <div className='card-item'>Complete Orders</div>
            <div className='card-item'>Incomplete Orders</div>
            <div className='card-item'>untimely deliveries</div>
        </div>
    )
}
export default Card