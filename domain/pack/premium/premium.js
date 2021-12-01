requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Premium(nombre, precio) {
    Pack.call(this, nombre, precio);
    // this.contenidos = contenidos
  }
  
  Premium.prototype = Object.create(protoPack)

  Premium.prototype.getPrecio = function () {
    return this.precio + 5
  }

  var factory = (function singlePremium() {
    return {
        getPremium: function getPremium(price, precio, extraFee) {
        return new Premium(price, precio, extraFee);
      },
    };
  })();
  
  exports.premium = factory;
  