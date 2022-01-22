basicFactory = require("../basic");
requirePack = require("../../pack");
requireItemNormal = require("../../../item/normal/normal");
requireItemConsumible = require("../../../item/consumible/consumible");
requireItemIndestructible = require("../../../item/indestructible/indestructible");
Pack = requirePack.class;

let packBasic

beforeEach(async () => {
    packBasic =  basicFactory.basic.getBasic("Pack Basic", 10, false, false, [
        requireItemNormal.normal.getNormal("Item Normal 1", 3, 0, 50),
        requireItemNormal.normal.getNormal("Item Normal 2", 3, 0, 50),
      ])
})

test("Crear pack Basic", () => {
  expect(packBasic.nombre).toEqual("Pack Basic");
});

test("Herencia de Pack", () => {
  expect(packBasic).toBeInstanceOf(Pack);
});

test('Vender un pack', () => {
  expect(packBasic.vender()).toBe(5)
})
