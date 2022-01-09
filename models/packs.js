var mongoose = require('mongoose')
var Item = require('./item')
var Schema = mongoose.Schema;

var packSchema = new Schema(
    {
        nombre: String,
        precio: Number,
        calidad: String,
        abierto: Boolean,
        vendido: Boolean,
        items: [{type: Schema.Types.ObjectId, ref: Item}],
    },
    {
        versionKey: false
    }
)
module.exports = mongoose.model('Packs', packSchema)