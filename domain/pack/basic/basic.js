requirePack = require('../pack')
protoPack = requirePack.proto
Pack = requirePack.class

function Basic(nombre, precio, contenido) {
    Pack.call(this, nombre, precio, contenido);
    // this.contenidos = contenidos
  }
  
  Basic.prototype = Object.create(protoPack)

  var factory = (function singleBasic() {
    return {
        getBasic: function getBasic(price, precio, contenido) {
        return new Basic(price, precio, contenido);
      },
    };
  })();
  
  exports.basic = factory;
  