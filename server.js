const cron = require("node-cron");
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const fetch = require('node-fetch');
const db = require('./Database/observedData-model');
const server = express()
const router = require('./api/testapi')

cron.schedule("* * * * *", async()=>{
    const url = "https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=02055000&parameterCd=00060,00065"
    const fetched = await fetch(url)
    const json = await fetched.json()
    const discharge = await json.value.timeSeries[0].values[0].value[0]
    const level = await json.value.timeSeries[1].values[0].value[0]
    const value = { dateTime: discharge.dateTime, waterDepth: Number(level.value), discharge: Number(discharge.value) }
    const find = {dateTime:discharge.dateTime}
    const data = await db.findBy(find)
    if(data.length===1){console.log('data exist - not committed')}else {
        db.add(value) 
    }   
        
})
server.use(helmet())
server.use(express.json())
server.use(cors())
server.use('/test', router);
server.get('/',(req, res)=>{
    res.send('<h3>Roanoke Gage data API</h3>')
})

module.exports = server


