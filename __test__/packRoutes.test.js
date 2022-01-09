const { expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const db = require('../db/mongoConf');

describe("Packs routes", () => {

    afterAll( async () => {
        db.disconnect();
    })

    test("Test packs/findOne/:nombre", () => {
        return request(app)
                .get(`/packs/findOne/Pack animales`)
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveProperty('_id', 'nombre', 'precio', 'calidad', 'vendido', 'abierto', 'items');
                    expect(res.body.nombre).toEqual(expect.stringMatching("Pack animales"));
                    expect(res.body._id).not.toBeFalsy();
                    expect(res.body.items).not.toBeFalsy()
                    expect(res.body.items[0]._id).toBe('61d58b6fd75d3770be591ce0')
                })
    });
    test("Test packs/allPacks", () => {
        return request(app)
                .get(`/packs/allPacks`)
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveLength(21);
                    expect(res.body[0]).toHaveProperty('_id', 'nombre', 'precio', 'calidad', 'vendido', 'abierto', 'items');
                    expect(res.body[0]._id).not.toBeFalsy()
                    expect(res.body[0].items).not.toBeFalsy()
                })
    });

    test("Test packs/delete/:id", () => {
        return request(app)
                .delete(`/packs/delete/61afc35457387547a0c0f6d1`)
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body._id).toBe('61afc35457387547a0c0f6d1');
                })
    }, 10000);              

    test("Test /packs/create", () => {
        return request(app)
                .post(`/packs/create`)
                .send(
                    {
                        "_id": "61afc35457387547a0c0f6d1",
                        "nombre": "Pack create",
                        "precio": 9,
                        "calidad": "Standard",
                        "vendido": false,
                        "abierto": false,
                        "items": [
                        "61dab49161dde91c2c30a102",
                        "61dab49161dde91c2c30a103",
                        "61dab49161dde91c2c30a104"
                        ]
                    }
                )
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveProperty('_id', 'nombre', 'precio', 'calidad', 'vendido', 'abierto', 'items');
                    expect(res.body.nombre).toEqual(expect.stringMatching("Pack create"));
                    expect(res.body._id).not.toBeFalsy();
                    expect(res.body.items).not.toBeFalsy()
                    expect(res.body.items[0]).toBe('61dab49161dde91c2c30a102')
                })
    });

});
