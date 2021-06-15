const geocode = require('../src/utils/geocode');
const requestSt = require('supertest');
const app = require('../src/app');

test('Should return geolocation for Bitola', async () => {
    await geocode('Bitola', (err, {longitude, latitude, location}) => {
        expect(err).toBeUndefined();
        expect(longitude).toBe(21.33333);
        expect(latitude).toBe(41.03333);
        expect(location).toBe('Bitola, North Macedonia');
    });
});

test('Should return an error for an empty location string', async () => {
    await geocode('', (err, resData) => {
        expect(resData).toBeUndefined();
        expect(err).toBe('An unknown error occurred.');
    });
});

test('Should return for non existing location.', async () => {
    await geocode('Kmsldkfdoslasd', (err, resData) => {
        expect(resData).toBeUndefined();
        expect(err).toBe('Couldn\'t find the requested location, please try again.');
    })
})
