requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Premium(nombre, precio, abierto, vendido, contenido) {
  Pack.call(this, nombre, precio, abierto, vendido, contenido);
  this.extraFee = 5
    // this.contenidos = contenidos
  }
  
  Premium.prototype = Object.create(protoPack)

  Premium.prototype.getPrecio = function () {
    return this.precio + 5
  }

  var factory = (function singlePremium() {
    return {
        getPremium: function getPremium(nombre, precio, abierto, vendido, contenido) {
        return new Premium(nombre, precio, abierto, vendido, contenido);
      },
    };
  })();
  
  exports.premium = factory;
  