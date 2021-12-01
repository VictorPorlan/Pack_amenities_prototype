premiumFactory = require('../premium')
requirePack = require('../../pack')
Pack = requirePack.class

test('Crear pack Premium', ()=> {
    let packPremium = premiumFactory.premium.getPremium('Pack Premium', 10)
    expect(packPremium.nombre).toBe("Pack Premium");
    expect(packPremium.precio).toBe(10);
})

test('Herencia de Pack', () => {
    let packPremium = premiumFactory.premium.getPremium('Pack Premium', 10)
    expect(packPremium).toBeInstanceOf(Pack)
})

test('Vender un pack', () => {
    let packPremium = premiumFactory.premium.getPremium('Pack Premium', 10)
   expect(packPremium.vender()).toBe(15)
})

test('Abrir un pack', () => {
    let packPremium = premiumFactory.premium.getPremium('Pack Premium', 10)
    //Compruebo que no se puede abrir hasta que no se haya vendido
    expect(packPremium.abrir).toBeUndefined()
    expect(packPremium.abierto).toBeFalsy()
    //La función vender crea un closure que te permite abrir el paquete
    packPremium.vender()
    expect(packPremium.abrir).toBeDefined()
    packPremium.abrir()
    expect(packPremium.abierto).toBe(true)
})
