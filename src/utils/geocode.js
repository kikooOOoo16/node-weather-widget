const req = require('postman-request');
const formatErrMessage = require('./errorHandler');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent(address) }.json?access_token=${process.env.GEOCODE_API_TOKEN}&limit=1`;
    req({url, json: true}, (err, {body: {message, features}}) => {
        if (err || message || !features || features.length === 0) {
            callback(
                formatErrMessage(err ? err.code : message ? features : ''),
                undefined
            );
            return;
        }
        callback(undefined, {
            longitude: features[0].center[0],
            latitude: features[0].center[1],
            location: features[0].place_name
        });
    })
}

module.exports = geocode;
