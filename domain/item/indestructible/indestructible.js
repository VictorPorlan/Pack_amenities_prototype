requireItem = require('../item')
protoItem = requireItem.proto
Item = requireItem.class
function Indestructible(nombre, precio, demanda, calidad, cantidad, id) {
    Item.call(this, nombre, precio, demanda, calidad, cantidad, id)
}

Indestructible.prototype = Object.create(protoItem)

/**
 * Aquí hago solo un return para hacer shadowing a la función usarItem y que no haga nada, esto es intencional.
 * Los objetos indestructibles NO pierden durabilidad al usarlos, ese es el motivo de este return.
 */
Indestructible.prototype.usarItem = function () {
    return
}

var factory = (function singleIndestructible() {
    return {
        getIndestructible: function getIndestructible(nombre, precio, demanda, calidad, cantidad, id) {
        return new Indestructible(nombre, precio, demanda, calidad, cantidad, id);
      },
    };
  })();
  
  exports.indestructible = factory;
  exports.class = Indestructible