import PageNav from "../../Components/PageNav/PageNav"
import Header from "../../Components/Header/Header"
import './Shipping-time.css'
import NamesBar from "../../Components/POR-Charts/bar"
import Donut from "../../Components/POR-Charts/Donut"
import Pie from "../../Components/POR-Charts/PieChart/pie"
import Card from "../../Components/Cards/Card"
import { useState,useEffect} from "react"
import Line from "../../Components/STC/line"
import { processData } from "../../Reusable/dataprocess"
import { data } from "../../Reusable/data"
import Map from "../../Components/STC/worldmap"
import WorldMap from "../../Components/STC/map"
import ProgressBar from "../../Components/Progressbar/progressbar"
import { dataQ } from "../../Reusable/dataQ"
import SubHeader from "../../Components/Subheader/Subheader"
const namesdata = [
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
const BASE_URL = 'http://127.0.0.1:5000/shipments'
const WORLDMAP_URL = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
function ShippingTime(){
    const[shippingdata,setShippingData] = useState()
    const[selectedYear,setSelectedYear] = useState('2023')
    const[mapdata,setMapData] = useState(null)
    useEffect(() => {
        async function fetchShippingData(){
            try {
                const res = await fetch(BASE_URL)
                if(!res.ok) throw  new Error('There was an error fetching data')
                const data = await res.json()
                setShippingData(data)

            }catch(error){
                console.log(error)
            }
        }
        fetchShippingData()
    },[])
    useEffect(() => {
        async function fetchMapData(){
            try{
                const res = await fetch(WORLDMAP_URL)
                if(!res.ok) throw new Error('There was an error fetching data')
                const data = await res.json()
                setMapData(data.features)


            }
            catch(error){
                console.log(error)

            }
        }
        fetchMapData()
    },[])
    // console.log(mapdata)
    const filteredData = shippingdata?.filter((item) => new Date(item.Date).getFullYear() === parseInt(selectedYear))
    // const processeddata = processData(filteredData) || []
    const processeddata = data(filteredData) || []
    const goaldata = dataQ(filteredData)
    
    //worldmap data 
    
//    console.log(processeddata)
let janShippingInfo = [];
processeddata.forEach((item) => {
    if (item.month.toLowerCase() === 'jan') {
        item.countries.forEach((country) => janShippingInfo.push({
            country: country.country,
            Air: country.Air,
            Sea: country.Sea
        }))
    }
});
// console.log(janShippingInfo);
let Q1ShippingInfo = {};

// Filter data for Q1 (Jan, Feb, Mar) and mode = "Air"
goaldata.forEach((item) => {
    if (['jan', 'feb', 'mar'].includes(item.month.toLowerCase())) {
        item.countries.forEach((country) => {
            if (!Q1ShippingInfo[country.country]) {
                Q1ShippingInfo[country.country] = { totalAir: 0, count: 0, goal: country.goal };
            }
            Q1ShippingInfo[country.country].totalAir += country.Air;
            Q1ShippingInfo[country.country].count += 1;
        });
    }
});

// Compute average shipping time and progress
const progressData = Object.keys(Q1ShippingInfo).map((country) => {
    const { totalAir, count, goal } = Q1ShippingInfo[country];
    const averageAir = totalAir / count;
    return {
        country,
        averageAir: averageAir.toFixed(2), // Rounded to 2 decimal places
        progress: ((averageAir / goal) * 100).toFixed(1), // Calculate percentage progress
    };
});

// Log the progress data for debugging
console.log(progressData);


    return(
        <div className='ST-container'>
        <Header className='ST-header'/>
        {/* <SubHeader className ='ST-subheader'/> */}
        <PageNav className='ST-sidebar'/>
        <Card className='ST-card'/>
       
        {/* <NamesBar className='ST-chart1' data={data} /> */}
        <Line data={processeddata} className='ST-chart1'/>
        <Donut className='ST-chart2'/>
        {/* <WorldMap data={janShippingInfo} mapdata={mapdata} className='ST-chart3'/> */}
        {/* <Pie className='ST-chart3'/> */}
        <Map data={janShippingInfo} mapdata={mapdata} className='ST-chart3'/>
        {/* <NamesBar className='ST-chart4' data={namesdata}/> */}
        <ProgressBar className='ST-chart4'/>
        </div>
    )
}
export default ShippingTime