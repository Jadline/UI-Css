import { max, scaleBand, scaleLinear, scaleOrdinal, schemeCategory10 } from "d3";
import { useState,useEffect } from "react"
const width = 300;
const height = 450;
const centerX = width /2;
const centerY = height /2
const Margin = { top: 20, bottom: 20, left: 20, right: 20 };

const innerHeight = height - Margin.top - Margin.bottom
const innerWidth = width - Margin.left - Margin.right
function Bar(){
    const [data,setData] = useState(null)
    useEffect(() => {
        async function fetchData(){
            const res = await fetch ('https://dummyjson.com/products')
            if(!res.ok) throw new Error('There was an error fetching data')
            const data = await res.json()
            setData(data.products)
        }
        fetchData()
    },[])
    
    if (!data) return <p>Loading....</p>;

    const brands = []
    data?.forEach((product) => {
        if(brands.includes(product.brand)) return
        brands.push(product.brand)
    })
    const brandsCategory = brands.map((brand) => {
        return {
            brand,
            count : data.filter((product) => product.brand === brand).length
        }
    })
    console.log(brandsCategory)
    const xScale = scaleLinear()
                .domain([0,max(brandsCategory,(d) => d.count)])
                .range([0,innerWidth])
    const yScale = scaleBand()
                    .domain(brandsCategory.map((d) => d.brand))
                    .range([0,innerHeight])
    const colorScale = scaleOrdinal(schemeCategory10)
    const bars = brandsCategory.map((category,i) => (
        <g  key={i} transform={`translate(0,${yScale(category.brand)})`}>
            <rect       
            y = {yScale(category.brand)}
            width ={xScale(category.count)}
            height = {yScale.bandwidth()}
            fill={colorScale(i)}
        />
        <text
        x={xScale(0) + 7}
        y={yScale(category.brand) + (yScale.bandwidth()/2)}
        textAnchor={"middle"}
        fontSize ={12}
        >
            {category.brand}
        </text>
        <text
        x ={xScale(category.count) -7}
        y ={yScale(category.brand) + (yScale.bandwidth() / 2)}
        textAnchor={"middle"}
        fontSize={12}
        >
            {category.count}
        </text>
        </g>

    ))
    const xGrids = xScale.ticks().map((value,i) => (
        <g key={i} transform ={`translate(${xScale(value)},0)`}>
            <text
            x ={xScale(value)}
            y ={innerHeight + 5}
            textAnchor={"middle"}
            alignmentBaseline ={"middle"}
            >
                {value}
            </text>
            <line
            x1 ={xScale(value)}
            x2={xScale(value)}
            y1 ={0}
            y2 ={innerHeight}
            stroke={'#000'}

            />

        </g>
    ))
    return(
        <svg width={width} height={height}>
            <g transform={`translate(${Margin.top},${Margin.left})`}>
                {xGrids}
                {bars}
            </g>
        </svg>
    )
}
export default Bar