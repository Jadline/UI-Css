import PageNav from '../Components/PageNav/PageNav'
import Header from '../Components/Header/Header'
import Card from '../Components/Cards/Card'
import Pie from '../Components/POR-Charts/PieChart/pie'
import Bar from '../Components/POR-Charts/bar'
import './perfect-order-rate.css'
function PerfectOrderRate(){
    return(
        <div className='container'>
        <Header className='header'/>
        <PageNav className= 'sidebar'/>
        <Card className='card'/>
        <Pie className ='chart1'/>
        <Pie className='chart2'/>
        <Pie className='chart3'/>
        <Pie className='chart4'/>
        </div>
    )
}
export default PerfectOrderRate