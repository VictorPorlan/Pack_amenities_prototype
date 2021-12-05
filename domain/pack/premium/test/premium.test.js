premiumFactory = require('../premium')
requirePack = require('../../pack')
Pack = requirePack.class
requireItemNormal = require("../../../item/normal/normal");
requireItemConsumible = require("../../../item/consumible/consumible");
requireItemIndestructible = require("../../../item/indestructible/indestructible");
Pack = requirePack.class

beforeEach(async () => {
    packPremium =  premiumFactory.premium.getPremium("Pack Premium", 10, [
        requireItemNormal.normal.getNormal("Item Normal 1", 3, 50, 50),
        requireItemNormal.normal.getNormal("Item Normal 2", 3, 50, 50),
        requireItemNormal.normal.getNormal("Item Normal 3", 3, 50, 50),
        requireItemNormal.normal.getNormal("Item Normal 4", 3, 50, 50),
      ])
  })

test('Crear pack Premium', ()=> {
    expect(packPremium.nombre).toBe("Pack Premium");
    expect(packPremium.precio).toBe(10);
})

test('Herencia de Pack', () => {
    expect(packPremium).toBeInstanceOf(Pack)
})

test('Vender un pack', () => {
   expect(packPremium.vender()).toBe(15)
})