const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

geocode('Sydney', (error, {latitude,longitude,location} = {}) => {
    if(error){
        return console.log(error)
    }
    forecast(latitude, longitude, (error, forecastData) => {
        if(error){
            return console.log(error)
        }
        console.log('Location: ', location)
        console.log('Weather: ', forecastData)
    })
})

