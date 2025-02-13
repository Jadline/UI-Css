import PageNav from "../../Components/PageNav/PageNav"
import Header from "../../Components/Header/Header"
import './Transportation-cost.css'
import Card from "../../Components/Cards/Card"
import Pie from "../../Components/POR-Charts/PieChart/pie"
import NamesBar from "../../Components/POR-Charts/bar"
import Donut from "../../Components/POR-Charts/Donut"
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
function TransportationCost (){
    return(
        <div className='TC-container'>
            <Header className='TC-header'/>
            <PageNav className='TC-sidebar'/>
            <Card className='TC-card'/>
            <Pie className='TC-chart1'/>
            <NamesBar className='TC-chart2' data={data}/>
            <NamesBar className = 'TC-chart3' data={data}/>
            <Donut className='TC-chart4'/>
        </div>
    )
}
export default TransportationCost