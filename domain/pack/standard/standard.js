requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Standard(nombre, precio, contenido) {
    Pack.call(this, nombre, precio, contenido);
  }
  
  Standard.prototype = Object.create(protoPack)

  Standard.prototype.getPrecio = function () {
    return this.precio + 2.5
  }

  var factory = (function singleStandard() {
    return {
        getStandard: function getStandard(price, precio, contenido) {
        return new Standard(price, precio, contenido);
      },
    };
  })();
  
  exports.standard = factory;
  