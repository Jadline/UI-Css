export function dataQ(dashboarddata) {
    if (!dashboarddata || dashboarddata.length === 0) {
        console.log("Dashboard data is empty or undefined.");
        return [];
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const getQuarter = (monthIndex) => {
        if (monthIndex <= 2) return "Q1";  // Jan - Mar
        if (monthIndex <= 5) return "Q2";  // Apr - Jun
        if (monthIndex <= 8) return "Q3";  // Jul - Sep
        return "Q4";  // Oct - Dec
    };

    const monthlydata = {};

    dashboarddata.forEach((item) => {
        const date = new Date(item.Date);
        const monthIndex = date.getMonth();
        const monthName = months[monthIndex];
        const quarter = getQuarter(monthIndex);
        const shippingMode = item["Shipment Type"];
        const shippingTime = item["Shipping Time (Days)"];
        const CountryName = item.Country;

        if (!monthlydata[monthName]) {
            monthlydata[monthName] = { monthName, Air: [], Sea: [], countries: {} };
        }

        if (!monthlydata[monthName].countries[CountryName]) {
            monthlydata[monthName].countries[CountryName] = { 
                Air: [], Sea: [], 
                AirQ1: [], AirQ2: [], AirQ3: [], AirQ4: [],
                SeaQ1: [], SeaQ2: [], SeaQ3: [], SeaQ4: [] 
            };
        }

        if (shippingMode.toLowerCase() === "air") {
            monthlydata[monthName].Air.push(shippingTime);
            monthlydata[monthName].countries[CountryName].Air.push(shippingTime);
            monthlydata[monthName].countries[CountryName][`Air${quarter}`].push(shippingTime);
        } 
        else if (shippingMode.toLowerCase() === "sea") {
            monthlydata[monthName].Sea.push(shippingTime);
            monthlydata[monthName].countries[CountryName].Sea.push(shippingTime);
            monthlydata[monthName].countries[CountryName][`Sea${quarter}`].push(shippingTime);
        }
    });

    const result = Object.values(monthlydata).map((monthdata) => ({
        month: monthdata.monthName,
        Air: monthdata.Air.length 
            ? monthdata.Air.reduce((acc, b) => acc + b, 0) / monthdata.Air.length 
            : 0,
        Sea: monthdata.Sea.length 
            ? monthdata.Sea.reduce((acc, b) => acc + b, 0) / monthdata.Sea.length  
            : 0,
        countries: Object.entries(monthdata.countries).map(([country, data]) => ({
            country: country,
            Air: data.Air.length 
                ? data.Air.reduce((acc, b) => acc + b, 0) / data.Air.length  
                : 0,
            Sea: data.Sea.length 
                ? data.Sea.reduce((acc, b) => acc + b, 0) / data.Sea.length  
                : 0,
            AirQ1: data.AirQ1.length 
                ? data.AirQ1.reduce((acc, b) => acc + b, 0) / data.AirQ1.length  
                : 0,
            AirQ2: data.AirQ2.length 
                ? data.AirQ2.reduce((acc, b) => acc + b, 0) / data.AirQ2.length  
                : 0,
            AirQ3: data.AirQ3.length 
                ? data.AirQ3.reduce((acc, b) => acc + b, 0) / data.AirQ3.length  
                : 0,
            AirQ4: data.AirQ4.length 
                ? data.AirQ4.reduce((acc, b) => acc + b, 0) / data.AirQ4.length  
                : 0,
            SeaQ1: data.SeaQ1.length 
                ? data.SeaQ1.reduce((acc, b) => acc + b, 0) / data.SeaQ1.length  
                : 0,
            SeaQ2: data.SeaQ2.length 
                ? data.SeaQ2.reduce((acc, b) => acc + b, 0) / data.SeaQ2.length  
                : 0,
            SeaQ3: data.SeaQ3.length 
                ? data.SeaQ3.reduce((acc, b) => acc + b, 0) / data.SeaQ3.length  
                : 0,
            SeaQ4: data.SeaQ4.length 
                ? data.SeaQ4.reduce((acc, b) => acc + b, 0) / data.SeaQ4.length  
                : 0
        }))
    }));

    result.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));
    console.log("Final Processed Data:", result);
    return result;
}
