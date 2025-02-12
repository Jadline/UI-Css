import { useState, useEffect } from "react";
import { arc, pie, scaleOrdinal, schemeCategory10 } from "d3";

function Pie({ className, width = "100%", height = "100%" }) {
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

    const categories = [];
    data.forEach((product) => {
        if (!categories.includes(product.category)) categories.push(product.category);
    });

    const salesCategory = categories.map((category) => ({
        category,
        count: data.filter((product) => product.category === category).length,
    }));

    const salesArc = arc().innerRadius(0).outerRadius(Math.min(size.width, size.height) / 2.5);
    const colorScale = scaleOrdinal(schemeCategory10);
    const salesPie = pie().value((d) => d.count);

    return (
        <svg
            className={className}
            width={size.width}
            height={size.height}
            viewBox={`0 0 ${size.width} ${size.height}`}
            preserveAspectRatio="xMidYMid meet"
        >
            <g transform={`translate(${centerX},${centerY})`}>
                {salesPie(salesCategory).map((d, i) => (
                    <path key={i} fill={colorScale(i)} d={salesArc(d)} />
                ))}
            </g>
        </svg>
    );
}

export default Pie;
