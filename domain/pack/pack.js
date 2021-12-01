function Pack(nombre, precio) {
    this.nombre = nombre
    this.precio = precio
    this.abierto = false
}

Pack.prototype.getName = function () {
  return this.nombre;
};

Pack.prototype.getPrecio = function () {
  return this.precio;
};

Pack.prototype.vender = function () {
  let closureAbrir = function() {
    function abrirPack(){ 
        this.abierto = true
    }
    return abrirPack;
};
  this.abrir = closureAbrir()
  return this.getPrecio()
}

exports.proto = Pack.prototype;
exports.class = Pack;

