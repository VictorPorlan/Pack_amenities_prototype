requirePack = require('../pack')
proto = requirePack.proto
Pack = requirePack.class

function Premium(nombre, precio, extraFee) {
    Pack.call(this, nombre, precio);
    this.precio = precio;
    this.extraFee = extraFee;
    // this.contenidos = contenidos
  }
  
  Premium.prototype = Object.create(proto)

  var factory = (function singlePremium() {
    return {
        getPremium: function getPremium(price, precio, extraFee) {
        return new Premium(price, precio, extraFee);
      },
    };
  })();
  
  exports.premium = factory;
  