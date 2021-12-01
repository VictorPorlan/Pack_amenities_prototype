standardFactory = require('../standard')
requirePack = require('../../pack')
Pack = requirePack.class

test('Crear pack Standard', ()=> {
    let packStandard = standardFactory.standard.getStandard('Pack Standard', 10)
    expect(packStandard.nombre).toBe("Pack Standard");
    expect(packStandard.precio).toBe(10);
})

test('Herencia de Pack', () => {
    let packStandard = standardFactory.standard.getStandard('Pack Standard', 10)
    expect(packStandard).toBeInstanceOf(Pack)
})

test('Vender un pack', () => {
    let packStandard = standardFactory.standard.getStandard('Pack Standard', 10)
   expect(packStandard.vender()).toBe(12.5)
})

test('Abrir un pack', () => {
    let packStandard = standardFactory.standard.getStandard('Pack Standard', 10)
    //Compruebo que no se puede abrir hasta que no se haya vendido
    expect(packStandard.abrir).toBeUndefined()
    expect(packStandard.abierto).toBeFalsy()
    //La función vender crea un closure que te permite abrir el paquete
    packStandard.vender()
    expect(packStandard.abrir).toBeDefined()
    packStandard.abrir()
    expect(packStandard.abierto).toBe(true)
})
