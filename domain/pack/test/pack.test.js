standardFactory = require('../standard/standard')
requirePack = require('../pack')
requireItemNormal = require("../../item/normal/normal");
requireItemConsumible = require("../../item/consumible/consumible");
requireItemIndestructible = require("../../item/indestructible/indestructible");
Pack = requirePack.class

beforeEach(async () => {
    packStandard =  standardFactory.standard.getStandard("Pack Standard", 10, [
        requireItemNormal.normal.getNormal("Item Normal 1", 3, 50, 50),
        requireItemNormal.normal.getNormal("Item Normal 2", 3, 50, 50),
        requireItemNormal.normal.getNormal("Item Normal 3", 3, 50, 50),
      ])
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

test("Items en paquetes", () => {
    expect(Array.isArray(packStandard.contenido)).toBe(true)
    expect(packStandard.contenido[0].nombre).toBe('Item Normal 1')
    packStandard.usarItems()
    // Comprobamos que la calidad de los items ha bajado correctamente
    packStandard.contenido.forEach((x) => {
      expect(x.calidad).toBe(49)
    })
  });