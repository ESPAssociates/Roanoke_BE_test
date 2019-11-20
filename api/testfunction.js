
const fetch = require('node-fetch');
const db = require('../Database/observedData-model.js');


const minutes = 0.25, the_interval = minutes * 60 * 1000;
setTimeout(async()=>{
    const url = "https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=02055000&parameterCd=00060,00065"
    const fetched = await fetch(url)
    const json = await fetched.json()
    const discharge = await json.value.timeSeries[0].values[0].value[0]
    const level = await json.value.timeSeries[1].values[0].value[0]
    const value = {dateTime:discharge.dateTime, waterDepth:Number(level.value), discharge:Number(discharge.value)}
    
        db.add(value)
        
},  the_interval);