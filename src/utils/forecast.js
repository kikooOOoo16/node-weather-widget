const req = require('postman-request');
const formatErrMessage = require('./errorHandler');

const forecast = ({ latitude, longitude } = {}, callback) => {
    const url =
        `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_API_KEY}&query=
        ${encodeURIComponent(latitude)}
        ,${encodeURIComponent(longitude)}
        &units=m`;
    req({url, json: true}, (err, {body}) => {
        if (err || body.error) {
            callback(
                formatErrMessage(err ? err.code : body.error.code),
                undefined
            );
            return;
        }
        callback(undefined, body);
    });
}

module.exports = forecast;
