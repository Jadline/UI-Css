import { scaleBand, scaleLinear,max,line, curveBasis } from "d3"
import { useState } from "react";
const width = 700;
const height = 400;
const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const boundsWidth = width - MARGIN.left - MARGIN.right;
const boundsHeight = height - MARGIN.top - MARGIN.bottom;
function Line( { data,className  }){
    if (!data) return <pre>Loading...</pre>;

    const groups = data.map((d) => d.month)

    const xScale = scaleBand()
                   .domain(groups)
                   .range([0,boundsWidth])
                   .padding(0.1); 
    const maxValue = max(data, (d) => Math.max(d.Air, d.Sea)) || 0;
    const yScale = scaleLinear()
        .domain([0, maxValue * 1.1])
        .range([boundsHeight, 0]);
    const lineAir = line()
                    .x((d) => xScale(d.month))
                    .y((d) => yScale(d.Air))
                    
    const lineSea = line()
                    .x((d) => xScale(d.month))
                    .y((d) => yScale(d.Sea))
                    .curve(curveBasis)
    const ygridLines = yScale.ticks().map((value,i) =>(
        <g key ={i}>
            <line
            x1={0}
            x2={boundsWidth}
            y1 = {yScale(value)}
            y2 ={yScale(value)}
            strokeWidth ={2}
            stroke={'#000'}
            opacity={0.2}
            />
            <text
            x ={-10}
            y ={yScale(value)}
            textAnchor={'end'}
            alignmentBaseline={'middle'}
            fontSize={12}
            >
                {value}
            </text>
        </g>
    ))
    const xLabels = groups.map((name, i) => {
        const xPos = xScale(name);
        if (xPos === undefined) return null;
        return (
            <text key={i}
                x={xPos + xScale.bandwidth() / 2}
                y={boundsHeight + 15}  // Fix y positioning
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                fontSize={12}
            >
                {name}
            </text>
        );
    });
    
    return (
      <div className={className} style={{ width: "100%", height: "100%", minHeight: "300px" ,display : 'flex' }}>
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none"  >
            <rect width={width} height={height} fill="#f4f4f4" rx={10} />


            <text x={width / 2} y={25} textAnchor="middle" fontSize={16} fontWeight="bold">
                Air vs. Sea shipping Times Trends
            </text>
            <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
                {ygridLines}
                <path 
  d={lineAir(data)} 
  fill="none" 
  stroke="rgba(18, 73, 113, 0.2)" 
  strokeWidth={10} 
  strokeLinecap="round"
/>
<path 
  d={lineAir(data)} 
  fill="none" 
  stroke="#124971"  
  strokeWidth={3} 
/>

<path 
  d={lineSea(data)} 
  fill="none" 
  stroke="rgba(255, 127, 14, 0.2)"  
  strokeWidth={10} 
  strokeLinecap="round"
/>
<path 
  d={lineSea(data)} 
  fill="none" 
  stroke="#ff7f0e" 
  strokeWidth={3} 
/>
<g transform={`translate(${boundsWidth - 150}, ${-10})`}>
                    <rect x={0} y={0} width={15} height={15} fill="#124971" />
                    <text x={20} y={12} fontSize={12} fill="black">Shipment by Air</text>

                    <rect x={0} y={20} width={15} height={15} fill="#ff7f0e" />
                    <text x={20} y={32} fontSize={12} fill="black">Shipment by Sea</text>
                </g>
  
                {xLabels}
            </g>
        </svg>
      </div>
    )
}
export default Line