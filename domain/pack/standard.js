requirePack = require('../pack')
proto = requirePack.proto
Pack = requirePack.class

function Standard(nombre, precio) {
    Pack.call(this, nombre, precio);
    this.precio = precio;
    this.extraFee = 2.5
    // this.contenidos = contenidos
  }
  
  Standard.prototype = Object.create(proto)

  var factory = (function singleBasci() {
    return {
        getBasic: function getBasic(price, precio, extraFee) {
        return new Basic(price, precio, extraFee);
      },
    };
  })();
  
  exports.premium = factory;
  