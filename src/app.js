const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const weatherStack = require('./utils/forecast');

const app = express();

//Environment variables config
require('dotenv').config();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars view template engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// allow static content access
app.use(express.static(publicDirectoryPath));

app.get('', (req, res, next) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kristijan'
    });
});

app.get('/about', (req, res, next) => {
    res.render('about', {
        title: 'About',
        name: 'Kristijan'
    });
});

app.get('/help', (req, res, next) => {
    res.render('help', {
        title: 'Help',
        message: 'A very helpful message.',
        name: 'Kristijan'
    })
})

app.get('/weather', (req, res, next) => {
    if (!req.query.address) {
        return res.status(400).json({
            errorMessage: 'Address query not provided'
        });
    }
    geocode(req.query.address, (err, geolocationRes) => {
        if (err) {
            return res.status(400).json({
                errorMessage: err
            });
        }
        weatherStack(geolocationRes,
            (err,{
                location: { name, country, localtime } ,
                current: { temperature, weather_descriptions, wind_speed, wind_dir, pressure, precip, humidity, cloudcover, feelslike, uv_index, visibility }
            } = {}) => {
                if (err) {
                    return res.status(400).json({
                        errorMessage: err
                    });
                }
                return res.status(200).json({
                    name,
                    country,
                    localtime,
                    temperature,
                    weather_descriptions: weather_descriptions[0],
                    wind_speed,
                    wind_dir,
                    pressure,
                    precipitation: precip,
                    humidity,
                    cloudcover,
                    feelslike,
                    uv_index,
                    visibility
                })
            });
    });
});

app.get('/help/*', (req, res, next) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        name: 'Kristijan'
    })
})

app.get('*', (req, res, next) => {
    res.render('404',{
        errorMessage: '404 Page Not Found',
        name: 'Kristijan'
    });
})

module.exports = app;
