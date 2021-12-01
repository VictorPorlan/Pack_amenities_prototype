requireItem = require('../item')
protoItem = requireItem.proto
Item = requireItem.class
function Normal(nombre, precio, demanda, calidad) {
    Item.call(this, nombre, precio, demanda, calidad)
}

Normal.prototype = Object.create(protoItem)

var factory = (function singleNormal() {
    return {
        getNormal: function getNormal(nombre, precio, demanda, calidad) {
        return new Normal(nombre, precio, demanda, calidad);
      },
    };
  })();
  
  exports.normal = factory;