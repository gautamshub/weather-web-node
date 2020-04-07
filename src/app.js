const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Stes the views path and templates
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directories in place
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gautam Ramasamy'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Gautam',
        name: 'Keerthana Gautam'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Gautam Ramasamy',
        msg: 'This is your help file'
    })
})

app.get('/weather', (req, res) => {
    if(req && req.query && !req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    geocode((req.query.address), (err, { latitude, longitude, location } = {}) => {
        if(err) {
            return res.send({ err });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errMsg: 'Help Article not Found!!!',
        name: 'Gautam Ramasamy',
        title: 'Help Article Missing!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errMsg: '404! Page not Found',
        name: 'Gautam Ramasamy',
        title: '404 Error'
    });
})

app.listen(3000, () => {
    console.log('Server is up and running in 3000!');
});