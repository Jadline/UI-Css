import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const Map = ({ data, mapdata, className }) => {
  const [shippingTimes, setShippingTimes] = useState({});
  const [tooltip, setTooltip] = useState({
    visible: false, 
    name: "", 
    air: "", 
    sea: "", 
    x: 0, 
    y: 0 
  });

  useEffect(() => {
    if (!data) return;

    // Convert data into a shipping time lookup
    const newShippingTimes = data.reduce((acc, item) => {
      if (item?.country) {
        acc[item.country] = {
          air: item.Air ? `${item.Air} days` : "N/A",
          sea: item.Sea ? `${item.Sea} days` : "N/A",
        };
      }
      return acc;
    }, {});

    setShippingTimes(newShippingTimes);
    console.log("Shipping Times Data:", newShippingTimes);
  }, [data]);

  const width = 800, height = 500;
  const projection = d3.geoNaturalEarth1().scale(200).translate([width / 2, height / 2]);
  const pathGenerator = d3.geoPath().projection(projection);

  const countries = {
    "China": "red",
    "South Africa": "green",
    "Netherlands": "blue",
    "Turkey": "purple",
    "United Arab Emirates": "orange",
    "United Kingdom": "yellow",
    "Italy": "pink"
  };

  const ukRegions = ["England", "Scotland", "Wales", "Northern Ireland"];

  if (!mapdata) return <div>Loading map...</div>;

  return (
    <div style={{ position: "relative", width: "100%", height: "500px",display : 'flex' ,borderRadius : '10px',overflow : 'hidden'}} className={className} >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width={width} height={height} fill={'#f4f4f4' } rx={20}/>
        <g>
          {mapdata.map((feature, index) => {
            let countryName = feature.properties.name;
            let displayName = countryName;
            let shippingInfo = shippingTimes[countryName];

            if (ukRegions.includes(countryName)) {
              displayName = "United Kingdom";
              shippingInfo = shippingTimes["UK"];
            }
            else if(countryName === 'United Arab Emirates') {
              displayName = 'United Arab Emirates'
              shippingInfo = shippingTimes['UAE']
            }


            const fillColor = ukRegions.includes(countryName) ? "yellow" : (countries[countryName] || "#ccc");

            return (
              <path
                key={index}
                d={pathGenerator(feature)}
                fill={fillColor}
                stroke="#fff"
                className="country"
                onMouseEnter={(e) => {
                //   console.log("Hovering over:", displayName, shippingInfo);
                  if (shippingInfo) {
                    setTooltip({ 
                      visible: true, 
                      name: displayName, 
                      air: shippingInfo.air, 
                      sea: shippingInfo.sea, 
                      x: e.clientX + 10, 
                      y: e.clientY - 10  
                    });
                  }
                }}
                onMouseMove={(e) => {
                  setTooltip((prev) => ({ ...prev, x: e.clientX + 10, y: e.clientY - 10 }));
                }}
                onMouseLeave={() => setTooltip({ visible: false })}
              />
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip.visible && (
        <div 
          style={{
            position: "absolute",
            left: tooltip.x -300,
            top: tooltip.y-10,
            background: "white",
            padding: "9px",
            border: "1px solid black",
            borderRadius: "5px",
            fontSize: "12px",
            pointerEvents: "none",
            zIndex: 9999, // Ensures tooltip appears on top
            boxShadow: "2px 2px 5px rgba(0,0,0,0.2)"
          }}
        >
          <b>{tooltip.name}</b><br />
          Air: {tooltip.air}<br />
          Sea: {tooltip.sea}
        </div>
      )}
    </div>
  );
};

export default Map;
