function Pack(nombre, precio) {
    this.nombre = nombre
    this.precio = precio
}

Pack.prototype.getName = function () {
  return this.nombre;
};

Pack.prototype.getPrecio = function () {
  return this.precio;
};

Pack.prototype.calcularPrecio = function () {
    return this.extraFee + this.precio;
};

var factory = (function singlePack() {
  return {
    getPack: function getPack(price) {
      return new Pack(price);
    },
  };
})();

exports.pack = factory;
exports.proto = Pack.prototype;
exports.class = Pack;

