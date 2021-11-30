requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Premium(nombre, precio) {
    Pack.call(this, nombre, precio);
    this.precio = precio;
    this.extraFee = 5;
    this.abierto = false
    // this.contenidos = contenidos
  }
  
  Premium.prototype = Object.create(protoPack)

  var factory = (function singlePremium() {
    return {
        getPremium: function getPremium(price, precio, extraFee) {
        return new Premium(price, precio, extraFee);
      },
    };
  })();
  
  exports.premium = factory;
  