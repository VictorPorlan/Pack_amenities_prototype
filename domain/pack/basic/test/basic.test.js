basicFactory = require("../basic");
requirePack = require("../../pack");
requireItemNormal = require("../../../item/normal/normal");
requireItemConsumible = require("../../../item/consumible/consumible");
requireItemIndestructible = require("../../../item/indestructible/indestructible");
Pack = requirePack.class;

let packBasic

beforeEach(async () => {
    packBasic =  basicFactory.basic.getBasic("Pack Basic", 10, [
        requireItemNormal.normal.getNormal("Item Normal 1", 3, 50, 50),
        requireItemNormal.normal.getNormal("Item Normal 2", 3, 50, 50),
        requireItemNormal.normal.getNormal("Item Normal 3", 3, 50, 50),
      ])
})

test("Crear pack Basic", () => {
  expect(packBasic.nombre).toEqual("Pack Basic");
});

test("Herencia de Pack", () => {
  expect(packBasic).toBeInstanceOf(Pack);
});

test("Vender un pack", () => {
  expect(packBasic.vender()).toBe(10);
});

test("Abrir un pack", () => {
  //Compruebo que no se puede abrir hasta que no se haya vendido
  expect(packBasic.abrir).toBeUndefined();
  expect(packBasic.abierto).toBeFalsy();
  //La función vender crea un closure que te permite abrir el paquete
  packBasic.vender();
  expect(packBasic.abrir).toBeDefined();
  packBasic.abrir();
  expect(packBasic.abierto).toBe(true);
});

test("Items en paquetes", () => {
  expect(Array.isArray(packBasic.contenido)).toBe(true)
  expect(packBasic.contenido[0].nombre).toBe('Item Normal 1')
  packBasic.usarItems()
});
