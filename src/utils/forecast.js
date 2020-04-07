const superagent = require('superagent');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4754f750e43d02061be3487fbc2b5e2d/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    superagent.get(url)
            .end((error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    });
}

module.exports = forecast