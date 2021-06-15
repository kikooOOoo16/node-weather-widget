const geocode = require('../src/utils/geocode');
const weatherStack = require('../src/utils/forecast');
const requestSt = require('supertest');
const app = require('../src/app');

test('Should return weather forecast for Bitola', async () => {
    await geocode('Bitola', (err, geolocationRes) => {
        if (err) {
            throw new Error(err);
        }
        weatherStack(geolocationRes,
            (err,{
                location: { name, country, localtime } ,
                current: { temperature, weather_descriptions, wind_speed, wind_dir, pressure, precip, humidity, cloudcover, feelslike, uv_index, visibility }
            } = {}) => {
                if (err) {
                    console.log(err);
                }
                expect(err).toBeUndefined();
                expect(name).toBe('Monastir');
                expect(country).toBe('Macedonia');
                expect(temperature).not.toBeNull();
                expect(pressure).not.toBeNull();
                expect(weather_descriptions).not.toBeNull();
                expect(wind_speed).not.toBeNull();
                expect(wind_dir).not.toBeNull();
                expect(precip).not.toBeNull();
                expect(humidity).not.toBeNull();
                expect(cloudcover).not.toBeNull();
                expect(feelslike).not.toBeNull();
                expect(uv_index).not.toBeNull();
                expect(visibility).not.toBeNull();
            });
    });
});
