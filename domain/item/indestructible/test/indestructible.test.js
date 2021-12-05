indestructibleFactory = require('../indestructible')
requireItem = require('../../item')
Item = requireItem.class

test('Crear item Indestructible', ()=> {
    itemIndestructible = indestructibleFactory.indestructible.getIndestructible('Item Indestructible', 3, 100, 50)
    expect(itemIndestructible.nombre).toBe('Item Indestructible')
    expect(itemIndestructible.precio).toBe(3)
    expect(itemIndestructible.demanda).toBe(100)
    expect(itemIndestructible.calidad).toBe(50)
})

test('Usar item', () => {
    itemIndestructible = indestructibleFactory.indestructible.getIndestructible('Item Indestructible', 5, 100, 50)
    itemIndestructible.usarItem()
    expect(itemIndestructible.calidad).toBe(50)
    itemIndestructible2 = indestructibleFactory.indestructible.getIndestructible('Item Indestructible', 5, 100, 1)
    itemIndestructible2.usarItem()
    expect(itemIndestructible2.calidad).toBe(1)
}, [])