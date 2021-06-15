const requestSt = require('supertest');
const app = require('../src/app');

test('Should get forecast for Bitola', async () => {
    const res = await requestSt(app)
        .get('/weather')
        .query({ address: 'Bitola' })
        .send()
        .expect(200);

//    Validate return forecast data
    expect(res.body.name).toBe('Monastir');
    expect(res.body.country).toBe('Macedonia');
});

test('Should return help page', async () => {
    const res = await requestSt(app)
        .get('/help')
        .send({
            title: 'Help',
            message: 'A very helpful message.',
            name: 'Kristijan'
        })
        .expect(200);
});

test('Should not return the help page', async () => {
    const res = await requestSt(app)
        .get('/help/1')
        .send({
            title: 'Help',
            message: 'A very helpful message.',
            name: 'Kristijan'
        })
        .expect(200);
});

test('Should return about page', async () => {
    const res = await requestSt(app)
        .get('/help')
        .send({
            title: 'About',
            name: 'Kristijan'
        })
        .expect(200);
});
