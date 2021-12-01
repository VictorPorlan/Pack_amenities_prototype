requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Premium(nombre, precio, contenido) {
    Pack.call(this, nombre, precio, contenido);
    // this.contenidos = contenidos
  }
  
  Premium.prototype = Object.create(protoPack)

  Premium.prototype.getPrecio = function () {
    return this.precio + 5
  }

  var factory = (function singlePremium() {
    return {
        getPremium: function getPremium(price, precio, contenido) {
        return new Premium(price, precio, contenido);
      },
    };
  })();
  
  exports.premium = factory;
  