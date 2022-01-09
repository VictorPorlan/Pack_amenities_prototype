requireItem = require('../item')
protoItem = requireItem.proto
Item = requireItem.class
function Normal(nombre, precio, demanda, calidad, cantidad, id) {
    Item.call(this, nombre, precio, demanda, calidad, cantidad, id)
}

Normal.prototype = Object.create(protoItem)

var factory = (function singleNormal() {
    return {
        getNormal: function getNormal(nombre, precio, demanda, calidad, cantidad, id) {
        return new Normal(nombre, precio, demanda, calidad, cantidad, id);
      },
    };
  })();
  
  exports.normal = factory;
  exports.class = Normal