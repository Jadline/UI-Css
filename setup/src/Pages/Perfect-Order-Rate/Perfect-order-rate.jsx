import PageNav from '../../Components/PageNav/PageNav'
import Header from '../../Components/Header/Header'
import Card from '../../Components/Cards/Card'
import Pie from '../../Components/POR-Charts/PieChart/pie'
import Bar from '../../Components/POR-Charts/bar'
import './perfect-order-rate.css'
import NamesBar from '../../Components/POR-Charts/bar'
import Donut from '../../Components/POR-Charts/Donut'

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


function PerfectOrderRate(){
    return(
        <div className='container'>
        <Header className='header'/>
        <PageNav className= 'sidebar'/>
        <Card className='card'/>
        <Pie className ='chart1'/>
        {/* <Pie className='chart2'/> */}
        {/* <Pie className='chart2'/> */}
        <NamesBar className='chart2' data={data}/>
        <NamesBar className='chart3' data={data}/>
        {/* <Pie className='chart3'/> */}
        {/* <Pie className='chart4'/> */}
        <Donut className='chart4'/>
        </div>
    )
}
export default PerfectOrderRate