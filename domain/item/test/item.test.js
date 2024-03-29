normalFactory = require('../normal/normal')
requireItem = require('../item')
Item = requireItem.class

test('Recalcular precio', () => {
    // La demanda es un multiplicador de precio. Por ejemplo, si la demanda 
    // está a 100 se suma un 100% del precio (se duplica). Puede ser cualquier número del 0 al 100

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

test('Bajar cantidad', () => {
    // Si hay mas de 1 y llegas a 0 de calidad, se baja en 1 la cantidad y sube la cantidad de nuevo a 50
    
    itemNormal = normalFactory.normal.getNormal('Item Normal', 5, 100, 1, 2)
    itemNormal.usarItem()
    expect(itemNormal.calidad).toBe(50)
    expect(itemNormal.cantidad).toBe(1)
})
