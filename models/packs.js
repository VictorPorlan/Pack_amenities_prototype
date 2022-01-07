var mongoose = require('mongoose')
var Item = require('./item')
var Schema = mongoose.Schema;

var packSchema = new Schema(
    {
        nombre: String,
        precio: Number,
        abierto: Boolean,
        vendido: Boolean,
        contenido: [{type: mongoose.Schema.Types.ObjectId, ref: Item.nombre}],
    }
)
module.exports = mongoose.model('Packs', packSchema)