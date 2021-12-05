function Pack(nombre, precio, abierto, vendido, contenido) {
  this.nombre = nombre;
  this.precio = precio;
  this.abierto = abierto;
  this.vendido = vendido;
  this.contenido = contenido;
  this.extraFee = 0;
}

Pack.prototype.getName = function () {
  return this.nombre;
};

Pack.prototype.getPrecio = function () {
  return this.precio;
};

Pack.prototype.getExtraFee = function () {
  return this.extraFee;
};

Pack.prototype.recalcularPrecioPack = function () {
  if (this.contenido != undefined) {
    let precioTotalItems = this.contenido.map((x) => {
      x.recalcularPrecio(),
      {nombre , precio, ...rest} = x
      return precio
    }
    ).reduce((a, b) => a + b);
    return precioTotalItems + this.extraFee;
  }
};

Pack.prototype.usarItems = function () {
  if (this.abierto) {
    this.contenido.forEach((item) => {
      item.usarItem();
    });
  }
};

Pack.prototype.usarItemIndex = function (index) {
  if (this.abierto) {
    this.contenido[index].usarItem();
  }
};

Pack.prototype.vender = function () {
  if (!this.vendido) {
    this.vendido = true;
    let closureAbrir = function () {
      function abrirPack() {
        this.abierto = true;
      }
      return abrirPack;
    };
    this.abrir = closureAbrir();
    this.precio = this.recalcularPrecioPack();
    return this.precio;
  }
};

exports.proto = Pack.prototype;
exports.class = Pack;
