import { useState, useEffect, useRef } from "react";
import { max, scaleBand, scaleLinear } from "d3";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

function NamesBar({ data, className }) {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 700, height: 400 });

    // useEffect(() => {
    //     const resizeObserver = new ResizeObserver((entries) => {
    //         if (!entries || entries.length === 0) return;
    //         const { width } = entries[0].contentRect;
            
    //         // Maintain a good aspect ratio instead of a fixed height
    //         const height = width * 0.6; 
    //         setDimensions({ width, height });
    //     });

    //     if (containerRef.current) {
    //         resizeObserver.observe(containerRef.current);
    //     }

    //     return () => resizeObserver.disconnect();
    // }, []);

    const { width, height } = dimensions;
    const boundsWidth = width - MARGIN.left - MARGIN.right;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    if (!data) return <pre>Loading...</pre>;

    const groups = data.sort((a, b) => b.value - a.value).map((d) => d.name);

    const yScale = scaleBand()
        .domain(groups)
        .range([0, boundsHeight])
        .padding(BAR_PADDING);

    const xScale = scaleLinear()
        .domain([0, max(data, (d) => d.value) || 10])
        .range([0, boundsWidth]);

    const allShapes = data.map((d, i) => {
        const y = yScale(d.name);
        if (y === undefined) return null;
        return (
            <g key={i}>
                <rect
                    x={0}
                    y={y}
                    width={xScale(d.value)}
                    height={yScale.bandwidth()}
                    opacity={0.7}
                    fill={"#9d174d"}
                    stroke={"#9d174d"}
                    fillOpacity={0.3}
                    strokeWidth={1}
                    rx={1}
                />
                <text
                    textAnchor={"end"}
                    alignmentBaseline={"middle"}
                    fontSize={12}
                    x={xScale(d.value) - 7}
                    y={y + yScale.bandwidth() / 2}
                    opacity={xScale(d.value) > 90 ? 1 : 0}
                >
                    {d.value}
                </text>
                <text
                    className='chart-text'
                    textAnchor={"start"}
                    alignmentBaseline={"middle"}
                    fontSize={12}
                    x={xScale(0) + 7}
                    y={y + yScale.bandwidth() / 2}
                >
                    {d.name}
                </text>
            </g>
        );
    });

    const grid = xScale.ticks(5).slice(1).map((value, i) => (
        <g key={i}>
            <line x1={xScale(value)} x2={xScale(value)} y1={0} y2={boundsHeight} stroke={"#808080"} opacity={0.2} />
            <text x={xScale(value)} y={boundsHeight + 10} textAnchor={"middle"} alignmentBaseline={"middle"} fontSize={9} stroke={"#808080"} opacity={0.8} className='chart-text'>
                {value}
            </text>
        </g>
    ));

    return (
        <div ref={containerRef} className={className} style={{ width: "100%", height: "100%", minHeight: "300px" }}>
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
            >
                <g width={boundsWidth} height={boundsHeight} transform={`translate(${MARGIN.left},${MARGIN.top})`}>
                    {grid}
                    {allShapes}
                </g>
            </svg>
        </div>
    );
}

export default NamesBar;
