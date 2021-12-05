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
      ])
})

test("Crear pack Basic", () => {
  expect(packBasic.nombre).toEqual("Pack Basic");
});

test("Herencia de Pack", () => {
  expect(packBasic).toBeInstanceOf(Pack);
});