import './subheader.css'
function SubHeader({className}){
    return(
        <div className={`${className || ''} subheader`}>
           <div >
           <p>Air</p>
           <p>Sea</p>
           </div>
           <div>
            filter
           </div>
        </div>
    )
}
export default SubHeader