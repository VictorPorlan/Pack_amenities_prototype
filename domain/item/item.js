function Item(nombre, precio, demanda, calidad) {
  this.nombre = nombre;
  this.precio = precio;
  this.demanda = demanda;
  this.calidad = calidad;
}

Item.prototype.usarItem = function () {
  this.calidad = this.calidad - 1;
};

Item.prototype.recalcularPrecio = function () {
  this.precio = (this.precio / 100) * (this.demanda + 100)
};

exports.proto = Item.prototype;
exports.class = Item;
