import PageNav from "../../Components/PageNav/PageNav"
import Header from "../../Components/Header/Header"
import './Shipping-time.css'
import NamesBar from "../../Components/POR-Charts/bar"
import Donut from "../../Components/POR-Charts/Donut"
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
function ShippingTime(){
    return(
        <div className='ST-container'>
        <Header className='ST-header'/>
        <PageNav className='ST-sidebar'/>
        <Card className='ST-card'/>
        <NamesBar className='ST-chart1' data={data} />
        <Donut className='ST-chart2'/>
        <Pie className='ST-chart3'/>
        <NamesBar className='ST-chart4' data={data}/>
        
        </div>
    )
}
export default ShippingTime