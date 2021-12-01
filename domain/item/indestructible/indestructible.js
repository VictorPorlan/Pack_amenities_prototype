requireItem = require('../item')
protoItem = requireItem.proto
Item = requireItem.class
function Indestructible(nombre, precio, demanda, calidad) {
    Item.call(this, nombre, precio, demanda, calidad)
}

Indestructible.prototype = Object.create(protoItem)

Indestructible.prototype.usarItem = function () {
    return
}

var factory = (function singleIndestructible() {
    return {
        getIndestructible: function getIndestructible(nombre, precio, demanda, calidad) {
        return new Indestructible(nombre, precio, demanda, calidad);
      },
    };
  })();
  
  exports.indestructible = factory;