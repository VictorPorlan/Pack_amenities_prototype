const { expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const db = require('../db/mongoConf');

describe("Packs routes", () => {

    afterAll( async () => {
        db.disconnect();
    })

    test("Test packs/findOne/:nombre", async () => {
        const res = await request(app)
            .get(`/packs/findOne/Pack animales`);
        expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', 'nombre', 'precio', 'calidad', 'vendido', 'abierto', 'items');
        expect(res.body.nombre).toEqual(expect.stringMatching("Pack animales"));
        expect(res.body._id).not.toBeFalsy();
        expect(res.body.items).not.toBeFalsy();
        expect(res.body.items[0]._id).toBe('61d58b6fd75d3770be591ce0');
    });
    test("Test packs/allPacks", async () => {
        const res = await request(app)
            .get(`/packs/allPacks`);
        expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(21);
        expect(res.body[0]).toHaveProperty('_id', 'nombre', 'precio', 'calidad', 'vendido', 'abierto', 'items');
        expect(res.body[0]._id).not.toBeFalsy();
        expect(res.body[0].items).not.toBeFalsy();
    });

    test("Test packs/delete/:id", async () => {
        const res = await request(app)
            .delete(`/packs/delete/Pack brujas`);
        expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
        expect(res.statusCode).toEqual(200);
        expect(res.body.nombre).toBe('Pack brujas');
    }, 10000);              

    test("Test /packs/create", async () => {
        const res = await request(app)
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
            );
        expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', 'nombre', 'precio', 'calidad', 'vendido', 'abierto', 'items');
        expect(res.body.nombre).toEqual(expect.stringMatching("Pack create"));
        expect(res.body._id).not.toBeFalsy();
        expect(res.body.items).not.toBeFalsy();
        expect(res.body.items[0]).toBe('61dab49161dde91c2c30a102');
    });

    test("Test packs/buy/:nombre",  async() => {
        const res =await request(app)
            .get(`/packs/buy/Pack piscina`);
        expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', 'nombre', 'precio', 'calidad', 'vendido', 'abierto', 'items');
        expect(res.body.nombre).toEqual(expect.stringMatching("Pack piscina"));
        expect(res.body.vendido).toBe(true);
        expect(res.body._id).not.toBeFalsy();
        expect(res.body.items).not.toBeFalsy();
    });

    test("Test packs/open/:nombre",  async() => {
        await request(app).get(`/packs/buy/Pack piscina`);
        const res =await request(app).get(`/packs/open/Pack piscina`);
        expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', 'nombre', 'precio', 'calidad', 'vendido', 'abierto', 'items');
        expect(res.body.nombre).toEqual(expect.stringMatching("Pack piscina"));
        expect(res.body.abierto).toBe(true);
        expect(res.body._id).not.toBeFalsy();
        expect(res.body.items).not.toBeFalsy();
    });

    test("Test packs/open/:nombre fallo",  async() => {
        const res =await request(app).get(`/packs/open/Pack piscina`);
        expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe(true);
    });

    test("Test packs/useItems/:nombre",  async() => {
        await request(app).get(`/packs/buy/Pack piscina`);
        await request(app).get(`/packs/open/Pack piscina`);
        const res = await request(app).get(`/packs/useItems/Pack piscina`);
        expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nombre', 'precio', 'calidad', 'vendido', 'abierto', 'items');
        expect(res.body.nombre).toEqual(expect.stringMatching("Pack piscina"));
        expect(res.body.abierto).toBe(true);
        expect(res.body.items[0].calidad).toBe(34);
        expect(res.body.items[1].calidad).toBe(19);
    });

    // Este test lo hago para comprobar que cuando un item tiene mas de 1 de cantidad, 
    // al llegar a 0 de calidad se baja en 1 la calidad en vez de borrarse.
    
    test("Test packs/useItems/:nombre cantidad",  async() => {
        await request(app).get(`/packs/buy/Pack Squanchy Style`);
        await request(app).get(`/packs/open/Pack Squanchy Style`);
        const res = await request(app).get(`/packs/useItems/Pack Squanchy Style`);
        expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nombre', 'precio', 'calidad', 'vendido', 'abierto', 'items');
        expect(res.body.nombre).toEqual(expect.stringMatching("Pack Squanchy Style"));
        expect(res.body.abierto).toBe(true);
    });

    test("Test packs/useItem/:nombre/:index",  async() => {
        await request(app).get(`/packs/buy/Pack piscina`);
        await request(app).get(`/packs/open/Pack piscina`);
        const res = await request(app).get(`/packs/useItem/Pack piscina/2`);
        expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nombre', 'precio', 'calidad', 'vendido', 'abierto', 'items');
        expect(res.body.nombre).toEqual(expect.stringMatching("Pack piscina"));
        expect(res.body.abierto).toBe(true);
        expect(res.body.items[1].calidad).toBe(18);
    });
});
