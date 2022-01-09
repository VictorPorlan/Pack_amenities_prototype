requireItem = require('../item')
protoItem = requireItem.proto
Item = requireItem.class
function Consumible(nombre, precio, demanda, calidad, cantidad, id) {
    Item.call(this, nombre, precio, demanda, calidad, cantidad, id)
}

Consumible.prototype = Object.create(protoItem)

Consumible.prototype.usarItem = function () {
    this.calidad = 0
}

var factory = (function singleConsumible() {
    return {
        getConsumible: function getConsumible(nombre, precio, demanda, calidad, cantidad, id) {
        return new Consumible(nombre, precio, demanda, calidad, cantidad, id);
      },
    };
  })();
  
  exports.consumible = factory;
  exports.class = Consumible