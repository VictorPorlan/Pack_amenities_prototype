requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Basic(nombre, precio, abierto, vendido, contenido) {
    Pack.call(this, nombre, precio, abierto, vendido, contenido);
    this.extraFee = -1
  }
  
  Basic.prototype = Object.create(protoPack)

  Basic.prototype.getPrecio = function () {
    return this.precio - 1
  }

  var factory = (function singleBasic() {
    return {
        getBasic: function getBasic(nombre, precio, abierto, vendido, contenido) {
        return new Basic(nombre, precio, abierto, vendido, contenido);
      },
    };
  })();
  
  exports.basic = factory;
  