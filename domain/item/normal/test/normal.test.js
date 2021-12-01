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

test('Recalcular precio', () => {
    itemNormal = normalFactory.normal.getNormal('Item Normal', 5, 100, 50)
    itemNormal.recalcularPrecio()
    expect(itemNormal.precio).toBe(10)
    //Compruebo otros casos
    itemNormal2 = normalFactory.normal.getNormal('Item Normal2', 5, 50, 50)
    itemNormal2.recalcularPrecio()
    expect(itemNormal2.precio).toBe(7.5)

    itemNormal3 = normalFactory.normal.getNormal('Item Normal2', 5, 0, 50)
    itemNormal3.recalcularPrecio()
    expect(itemNormal3.precio).toBe(5)
})

test('Usar item', () => {
    itemNormal = normalFactory.normal.getNormal('Item Normal', 5, 100, 50)
    itemNormal.usarItem()
    expect(itemNormal.calidad).toBe(49)
    itemNormal2 = normalFactory.normal.getNormal('Item Normal', 5, 100, 1)
    itemNormal2.usarItem()
    expect(itemNormal2.calidad).toBe(0)
}, [])