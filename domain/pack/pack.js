function Pack(nombre, precio, abierto, vendido, items) {
  this.nombre = nombre;
  this.precio = precio;
  this.abierto = abierto;
  this.vendido = vendido;
  this.items = items;
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
  if (this.items != undefined) {
    
    let precioTotalItems = this.items.map((x) => {
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
    this.items.forEach((item) => {
      item.usarItem();
    });
  }
  this.items.forEach((x) => {
    if(x.calidad == 0) {
        this.items.splice(this.items.indexOf(x), 1)
    }
  })
};

Pack.prototype.usarItemIndex = function (index) {
  if (this.abierto) {
    this.items[index].usarItem();
    if(this.items[index] == 0) {
      this.items.splice(index, 1)
  }
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
