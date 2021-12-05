standardFactory = require('../standard')
requirePack = require('../../pack')
requireItemNormal = require("../../../item/normal/normal");
requireItemConsumible = require("../../../item/consumible/consumible");
requireItemIndestructible = require("../../../item/indestructible/indestructible");
Pack = requirePack.class

beforeEach(async () => {
    packStandard =  standardFactory.standard.getStandard("Pack Standard", 10, false, false, [
        requireItemNormal.normal.getNormal("Item Normal 1", 3, 0, 1),
        requireItemNormal.normal.getNormal("Item Normal 2", 3, 0, 1),
        requireItemNormal.normal.getNormal("Item Normal 3", 3, 0, 1),
      ])
  })

test('Crear pack Standard', ()=> {
    expect(packStandard.nombre).toBe("Pack Standard");
    expect(packStandard.precio).toBe(10);
})

test('Herencia de Pack', () => {
    expect(packStandard).toBeInstanceOf(Pack)
})

test('Vender un pack', () => {
   expect(packStandard.vender()).toBe(9)
})