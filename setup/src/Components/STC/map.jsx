import { geoNaturalEarth1, geoPath } from "d3";
import { useState, useEffect } from "react";

const width = 800;
const height = 500;
const countries = {
    "China": "red",
    "South Africa": "green",
    "Netherlands": "blue",
    "Turkey": "purple",
    "United Arab Emirates": "orange",
    "United Kingdom": "yellow",
    "Italy": "pink",
};

const ukRegions = ["England", "Scotland", "Wales", "Northern Ireland"];

function WorldMap({ data, mapdata }) {
    const [shippingTimes, setShippingTimes] = useState({});
    const [tooltip, setTooltip] = useState({
        visible: false,
        name: "",
        Air: "",
        Sea: "",
        x: 0,
        y: 0,
    });

    useEffect(() => {
        if (!data) return;
        const newShippingTimes = data.reduce((acc, dataitem) => {
            if (dataitem?.country) {
                acc[dataitem.country] = {
                    Air: dataitem.Air ? `${dataitem.Air} days` : "N/A",
                    Sea: dataitem.Sea ? `${dataitem.Sea} days` : "N/A",
                };
            }
            return acc;
        }, {});
        setShippingTimes(newShippingTimes);
    }, [data]);

    const projection = geoNaturalEarth1().scale(200).translate([width / 2, height / 2]);
    const pathGenerator = geoPath().projection(projection);

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                {mapdata &&
                    mapdata.map((feature, i) => {
                        let countryName = feature.properties.name;
                        let displayName = countryName;
                        let shippinginfo = shippingTimes[countryName];

                        if (ukRegions.includes(countryName)) {
                            displayName = "United Kingdom";
                            shippinginfo = shippingTimes["United Kingdom"];
                        } 

                        const fillColor = ukRegions.includes(countryName)
                            ? "yellow"
                            : countries[countryName] || "#ccc";

                        return (
                            <path                                    
                                key={i}
                                d={pathGenerator(feature)}
                                fill={fillColor}
                                stroke={"#fff"}
                                onMouseEnter={(e) => {
                                    if (shippinginfo) {
                                        setTooltip({
                                            visible: true,
                                            name: displayName,
                                            Air: shippinginfo.Air,
                                            Sea: shippinginfo.Sea,
                                            x: e.clientX + 10,
                                            y: e.clientY - 10,
                                        });
                                    }
                                }}
                                onMouseMove={(e) =>
                                    setTooltip((prev) => ({
                                        ...prev,
                                        x: e.clientX + 10,
                                        y: e.clientY - 10,
                                    }))
                                }
                                onMouseLeave={() =>
                                    setTooltip({
                                        visible: false,
                                        name: "",
                                        x: 0,
                                        y: 0,
                                        Air: "",
                                        Sea: "",
                                    })
                                }
                            />
                        );
                    })}
            </svg>

            {/* Tooltip */}
            {tooltip.visible && (
                <div
                    style={{
                        position: "absolute",
                        padding: "8px",
                        backgroundColor: "red",
                        color: "#fff",
                        fontSize: "12px",
                        zIndex: 999,
                        left: tooltip.x-250,
                        top: tooltip.y + 10, 
                        borderRadius: "5px",
                        whiteSpace: "nowrap",
                        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                    }}
                >
                    <b>{tooltip.name}</b>
                    <br />
                    {`Sea: ${tooltip.Sea}`} <br />
                    {`Air: ${tooltip.Air}`}
                </div>
            )}
        </div>
    );
}

export default WorldMap;
