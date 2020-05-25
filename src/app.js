const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hyrum Butler'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About a boy',
        name: 'Hyrum Butler'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'I\'m glad to help. Please explain the problem.',
        title: 'Help',
        name: 'Hyrum Butler'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ 
            error: 'Please provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) { 
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) { 
                return res.send({ error })
            }
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hyrum Butler',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hyrum Butler',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
