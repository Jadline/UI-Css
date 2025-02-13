import PageNav from "../../Components/PageNav/PageNav"
import Header from "../../Components/Header/Header"
import './Number-of-Shipments.css'
import NamesBar from "../../Components/POR-Charts/bar"
import Pie from "../../Components/POR-Charts/PieChart/pie"
import Card from "../../Components/Cards/Card"
const data = [
    {name:"Mark", value: 90},
    {name:"Robert", value: 12},
    {name:"Emily", value: 34},
    {name:"Marion", value: 53},
    {name:"Nicolas", value: 98},
    {name:"Mélanie", value: 23},
    {name:"Gabriel", value: 18},
    {name:"Jean", value: 104},
    {name:"Paul", value: 2},
  ]
function NumberOfShipments(){
    return(
        <div className='NOS-container'>
        <Header className='NOS-header'/>
        <PageNav className='NOS-sidebar'/>
        <Card className='NOS-card'/>
        <NamesBar className='NOS-chart1' data={data}/>
        <Pie className='NOS-chart2'/>
        </div>
    )
}
export default NumberOfShipments