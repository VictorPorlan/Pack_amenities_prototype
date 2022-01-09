function Item(nombre, precio, demanda, calidad, cantidad, id) {
  this.nombre = nombre;
  this.precio = precio;
  this.demanda = demanda;
  this.calidad = calidad;
  this.cantidad = cantidad;
  this._id = id;
}

Item.prototype.usarItem = function () {
  if(this.calidad > 0){
  this.calidad = this.calidad - 1;
  }
  if(this.calidad == 0 && this.cantidad > 1){
    this.calidad = 50 
    this.cantidad = this.cantidad - 1
  }
};

Item.prototype.recalcularPrecio = function () {
  this.precio = (this.precio / 100) * (this.demanda + 100)
};

exports.proto = Item.prototype;
exports.class = Item;
