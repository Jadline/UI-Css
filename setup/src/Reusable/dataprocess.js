export function processData(filteredData){
    if(!filteredData) return []

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthlyData = {}

    filteredData.forEach((item) => {
        const date = new Date(item.Date)
        const monthIndex = date.getMonth()
        const monthName = monthNames[monthIndex]
        const shippingMode = item["Shipment Type"]
        const shippingTime = item["Shipping Time (Days)"]
        

        if(!monthlyData[monthName]){
            monthlyData[monthName] = {monthName,Air : [],Sea : []}
        }
        if(shippingMode.toLowerCase() === 'air'){
            monthlyData[monthName].Air.push(shippingTime)
        }
        else if(shippingMode.toLowerCase() === 'sea'){
            monthlyData[monthName].Sea.push(shippingTime)
        }

    })
    // console.log("Grouped Data:", monthlyData);
    const result = Object.values(monthlyData).map((monthData) => ({
        month : monthData.monthName,
        Air : monthData.Air.length ? monthData.Air.reduce((acc,b) => acc + b,0) / monthData.Air.length : 0,
        Sea : monthData.Sea.length ? monthData.Sea.reduce((acc,b) => acc + b,0) / monthData.Sea.length : 0
    }))
    result.sort((a,b) => monthNames.indexOf(a.month) - monthNames.indexOf(b.month))
    // console.log("Final Processed Data:", result);
    return result
    

}