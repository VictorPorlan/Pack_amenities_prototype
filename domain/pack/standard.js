requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Standard(nombre, precio) {
    Pack.call(this, nombre, precio);
    this.precio = precio;
    this.extraFee = 2.5
    this.abierto = false
    // this.contenidos = contenidos
  }
  
  Standard.prototype = Object.create(protoPack)

  var factory = (function singleStandard() {
    return {
        getStandard: function getStandard(price, precio, extraFee) {
        return new Standard(price, precio, extraFee);
      },
    };
  })();
  
  exports.standard = factory;
  