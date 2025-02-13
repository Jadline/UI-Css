import { useState, useEffect } from "react";
import { arc, pie, scaleOrdinal, schemeCategory10 } from "d3";

function Donut({ className, width = "100%", height = "100%" }) {
    const [size, setSize] = useState({ width: 300, height: 450 });

    useEffect(() => {
        function updateSize() {
            const newWidth = window.innerWidth < 600 ? 200 : 300;
            const newHeight = window.innerWidth < 600 ? 300 : 450;
            setSize({ width: newWidth, height: newHeight });
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const centerX = size.width / 2;
    const centerY = size.height / 2;
    
    const [data, setData] = useState(null);
    
    useEffect(() => {
        async function FetchData() {
            const res = await fetch("https://dummyjson.com/products");
            if (!res.ok) throw new Error("There was an error fetching the data");
            const data = await res.json();
            setData(data.products);
        }
        FetchData();
    }, []);

    if (!data) return <pre>Loading...</pre>;

    
    const categories = [...new Set(data.map((product) => product.category))];

    const salesCategory = categories.map((category) => ({
        category,
        count: data.filter((product) => product.category === category).length,
    }));

    
    const salesDonut = pie().value((d) => d.count);

   
    const salesArc = arc()
        .innerRadius(Math.min(size.width, size.height) / 4) // Ensure an inner radius for a donut
        .outerRadius(Math.min(size.width, size.height) / 2.5);

        const customPurples = ["#f2e5ff", "#dab6fc", "#ba7ffb", "#9955f4", "#7a2de8", "#5c1cb3"];
        const colorScale = scaleOrdinal(customPurples);
        
    // const colorScale = scaleOrdinal(schemeCategory10);

    return (
        <svg
            className={className}
            width={size.width}
            height={size.height}
            viewBox={`0 0 ${size.width} ${size.height}`}
            preserveAspectRatio="xMidYMid meet"
        >
            <g transform={`translate(${centerX},${centerY})`}>
                {salesDonut(salesCategory).map((d, i) => (
                    <path key={i} fill={colorScale(i + 1)} d={salesArc(d)} />
                ))}
            </g>
        </svg>
    );
}

export default Donut;
