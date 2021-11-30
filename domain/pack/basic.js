requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Basic(nombre, precio) {
    Pack.call(this, nombre, precio);
    this.precio = precio;
    this.extraFee = 0;
    this.abierto = false
    // this.contenidos = contenidos
  }
  
  Basic.prototype = Object.create(protoPack)

  var factory = (function singleBasic() {
    return {
        getBasic: function getBasic(price, precio, extraFee) {
        return new Basic(price, precio, extraFee);
      },
    };
  })();
  
  exports.basic = factory;
  