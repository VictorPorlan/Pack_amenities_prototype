consumibleFactory = require('../consumible')
requireItem = require('../../item')
Item = requireItem.class

test('Crear item Consumible', ()=> {
    itemConsumible = consumibleFactory.consumible.getConsumible('Item Consumible', 3, 100, 50)
    expect(itemConsumible.nombre).toBe('Item Consumible')
    expect(itemConsumible.precio).toBe(3)
    expect(itemConsumible.demanda).toBe(100)
    expect(itemConsumible.calidad).toBe(50)
})

test('Recalcular precio', () => {
    itemConsumible = consumibleFactory.consumible.getConsumible('Item Consumible', 5, 100, 50)
    itemConsumible.recalcularPrecio()
    expect(itemConsumible.precio).toBe(10)
    //Compruebo otros casos
    itemConsumible2 = consumibleFactory.consumible.getConsumible('Item Consumible2', 5, 50, 50)
    itemConsumible2.recalcularPrecio()
    expect(itemConsumible2.precio).toBe(7.5)

    itemConsumible3 = consumibleFactory.consumible.getConsumible('Item Consumible2', 5, 0, 50)
    itemConsumible3.recalcularPrecio()
    expect(itemConsumible3.precio).toBe(5)
})

test('Usar item', () => {
    itemConsumible = consumibleFactory.consumible.getConsumible('Item Consumible', 5, 100, 50)
    itemConsumible.usarItem()
    expect(itemConsumible.calidad).toBe(0)
    itemConsumible2 = consumibleFactory.consumible.getConsumible('Item Consumible', 5, 100, 1)
    itemConsumible2.usarItem()
    expect(itemConsumible2.calidad).toBe(0)
}, [])