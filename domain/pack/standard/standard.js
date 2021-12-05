requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Standard(nombre, precio, contenido, abierto, vendido) {
  Pack.call(this, nombre, precio, contenido, abierto, vendido);
}
  
  Standard.prototype = Object.create(protoPack)
  
  var factory = (function singleStandard() {
    return {
        getStandard: function getStandard(nombre, precio, abierto, vendido, contenido) {
        return new Standard(nombre, precio, abierto, vendido, contenido);
      },
    };
  })();
  
  exports.standard = factory;
  