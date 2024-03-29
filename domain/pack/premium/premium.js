requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Premium(nombre, precio, abierto, vendido, items) {
  Pack.call(this, nombre, precio, abierto, vendido, items);
  this.extraFee = 50
  }
  
  Premium.prototype = Object.create(protoPack)

  var factory = (function singlePremium() {
    return {
        getPremium: function getPremium(nombre, precio, abierto, vendido, items) {
        return new Premium(nombre, precio, abierto, vendido, items);
      },
    };
  })();
  
  exports.premium = factory;
  exports.class = Premium