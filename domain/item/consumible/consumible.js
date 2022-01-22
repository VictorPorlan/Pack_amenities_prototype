requireItem = require('../item')
protoItem = requireItem.proto
Item = requireItem.class
function Consumible(nombre, precio, demanda, calidad, cantidad, id) {
    Item.call(this, nombre, precio, demanda, calidad, cantidad, id)
}

Consumible.prototype = Object.create(protoItem)

Consumible.prototype.usarItem = function () {
  if(this.calidad > 0){
    this.calidad = 0;
    }
    if(this.calidad == 0 && this.cantidad > 1){
      this.calidad = 50 
      this.cantidad = this.cantidad - 1
    }}

var factory = (function singleConsumible() {
    return {
        getConsumible: function getConsumible(nombre, precio, demanda, calidad, cantidad, id) {
        return new Consumible(nombre, precio, demanda, calidad, cantidad, id);
      },
    };
  })();
  
  exports.consumible = factory;
  exports.class = Consumible