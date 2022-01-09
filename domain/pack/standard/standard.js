requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Standard(nombre, precio, items, abierto, vendido) {
  Pack.call(this, nombre, precio, items, abierto, vendido);
}
  
  Standard.prototype = Object.create(protoPack)
  
  var factory = (function singleStandard() {
    return {
        getStandard: function getStandard(nombre, precio, abierto, vendido, items) {
        return new Standard(nombre, precio, abierto, vendido, items);
      },
    };
  })();
  
  exports.standard = factory;
  exports.class = Standard