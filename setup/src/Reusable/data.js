export function data(dashboarddata){
    if(!dashboarddata || dashboarddata.length === 0) {
        console.log("Dashboard data is empty or undefined.");
        return [];
    }

    console.log("Dashboard Data:", dashboarddata); // Debugging log

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthlydata = {}

    dashboarddata.forEach((item) => {
        // console.log("Processing Item:", item); // Debugging log

        const date = new Date(item.Date)
        const monthIndex = date.getMonth()
        const monthName = months[monthIndex]
        const shippingMode = item['Shipment Type']
        const shippingTime = item['Shipping Time (Days)']
        const CountryName = item.Country

        if(!monthlydata[monthName]) {
            monthlydata[monthName] = { monthName, Air: [], Sea: [], countries: {} }
        }

        if(!monthlydata[monthName].countries[CountryName]) {
            monthlydata[monthName].countries[CountryName] = { Air: [], Sea: [] }
        }

        if(shippingMode.toLowerCase() === 'air'){
            monthlydata[monthName].Air.push(shippingTime)
            monthlydata[monthName].countries[CountryName].Air.push(shippingTime)
        }
        else if(shippingMode.toLowerCase() === 'sea') {
            monthlydata[monthName].Sea.push(shippingTime)
            monthlydata[monthName].countries[CountryName].Sea.push(shippingTime)
        }     
    });

    // console.log("Monthly Data After Processing:", JSON.stringify(monthlydata, null, 2)); // ✅ Log after each item // Debugging log

    const result = Object.values(monthlydata).map((monthdata) => ({
        month: monthdata.monthName,  // ✅ FIXED
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
                : 0
        }))
    }));

    result.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));

    console.log("Final Processed Data:", result); // Debugging log
    return result;
}
