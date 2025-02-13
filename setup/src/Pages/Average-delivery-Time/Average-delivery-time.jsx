import PageNav from "../../Components/PageNav/PageNav"
import Header from "../../Components/Header/Header"
import './Average-time-delivery.css'
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
function AverageDeliveryTime(){
    return(
        <div className='ATD-container'>
        <Header className='ATD-header'/>
        <PageNav className='ATD-sidebar'/>
        <Card className='ATD-card'/>
        <NamesBar className='ATD-chart1' data={data}/>
        <Donut className='ATD-chart2'/>
        <Donut className='ATD-chart21'/>
        <NamesBar className ='ATD-chart3' data={data}/>
        <Pie className = 'ATD-chart4'/>
        </div>
    )
}
export default AverageDeliveryTime