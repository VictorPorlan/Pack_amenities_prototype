normalFactory = require('../normal')
requireItem = require('../../item')
Item = requireItem.class

test('Crear item Normal', ()=> {
    itemNormal = normalFactory.normal.getNormal('Item Normal', 3, 100, 50)
    expect(itemNormal.nombre).toBe('Item Normal')
    expect(itemNormal.precio).toBe(3)
    expect(itemNormal.demanda).toBe(100)
    expect(itemNormal.calidad).toBe(50)
})

test('Usar item', () => {
    itemNormal = normalFactory.normal.getNormal('Item Normal', 5, 100, 50)
    itemNormal.usarItem()
    expect(itemNormal.calidad).toBe(49)
    itemNormal2 = normalFactory.normal.getNormal('Item Normal', 5, 100, 1)
    itemNormal2.usarItem()
    expect(itemNormal2.calidad).toBe(0)
}, [])