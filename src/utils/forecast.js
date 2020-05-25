const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ff84e265083ca3b8a1a2a6c945f602ef&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect to weather service for the forecast.')
        } else if (undefined, body.success === false) {
            callback('Unable to find location. Please try another location.')
        } else {
            console.log(body.current)
            callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degrees outside. It feels like ' + body.current.feelslike +
            ' degrees, and the humidity is ' + body.current.humidity + '%.')
        }
    })
}


module.exports = forecast
