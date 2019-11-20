const router = require('express').Router();
const fetch = require('node-fetch')
//const parseString = require('xml2js').parseString;
const db = require('../Database/observedData-model.js')

router.get('/', async(req, res) => {
  
    db.find()
    .then(data=>{res.json(data)})
})

router.post('/', async(req, res) => {
    const url = "https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=02055000&parameterCd=00060,00065"
    const fetched = await fetch(url)
    const json = await fetched.json()
    const discharge = await json.value.timeSeries[0].values[0].value[0]
    const level = await json.value.timeSeries[1].values[0].value[0]
    const value = {dateTime:discharge.dateTime, waterDepth:Number(level.value), discharge:Number(discharge.value)}
    
        db.add(value)
            .then(posted => {
                res.status(201).json(posted)
            })
            .catch(error => {
                res.status(500).json({ message: "There was an error while saving the post to the database" })
            })
    
})



module.exports = router