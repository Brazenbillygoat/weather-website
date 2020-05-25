const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYnJhemVuYmlsbHlnb2F0IiwiYSI6ImNrYWcwdTFkdDAyZzkycnBuMTlxYm93OHMifQ.oU0NdR7imrl93wOsrU7DYA&limit=1'

    request({ url, json: true }, (error, response) => {
        const features = response.body.features
        if (error) {
            callback('Unable to connect with weather service!', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[0],
                longitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode