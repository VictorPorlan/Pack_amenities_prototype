var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var packSchema = new Schema(
    {
        nombre: String,
        precio: Number,
        abierto: Boolean,
        vendido: Boolean,
        contenido: [],
    }
)
module.exports = mongoose.model('Packs', packSchema)