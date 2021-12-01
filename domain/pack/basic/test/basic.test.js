basicFactory = require('../basic')
requirePack = require('../../pack')
Pack = requirePack.class

test('Crear pack Basic', ()=> {
    let packBasic = basicFactory.basic.getBasic('Pack Basic', 10)
    expect(packBasic.nombre).toEqual('Pack Basic')
})

test('Herencia de Pack', () => {
    let packBasic = basicFactory.basic.getBasic('Pack Basic', 10)
    expect(packBasic).toBeInstanceOf(Pack)
})

test('Vender un pack', () => {
    let packBasic = basicFactory.basic.getBasic('Pack Basic', 10)
   expect(packBasic.vender()).toBe(10)
})

test('Abrir un pack', () => {
    let packBasic = basicFactory.basic.getBasic('Pack Basic', 10)
    //Compruebo que no se puede abrir hasta que no se haya vendido
    expect(packBasic.abrir).toBeUndefined()
    expect(packBasic.abierto).toBeFalsy()
    //La función vender crea un closure que te permite abrir el paquete
    packBasic.vender()
    expect(packBasic.abrir).toBeDefined()
    packBasic.abrir()
    expect(packBasic.abierto).toBe(true)
})
