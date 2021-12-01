requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Standard(nombre, precio) {
    Pack.call(this, nombre, precio);
    this.precio = precio;
    this.abierto = false
    // this.contenidos = contenidos
  }
  
  Standard.prototype = Object.create(protoPack)

  Standard.prototype.getPrecio = function () {
    return this.precio + 2.5
  }

  var factory = (function singleStandard() {
    return {
        getStandard: function getStandard(price, precio, extraFee) {
        return new Standard(price, precio, extraFee);
      },
    };
  })();
  
  exports.standard = factory;
  