var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var itemSchema = new Schema(
    {
    nombre: String,
    precio: Number,
    demanda: Number,
    material: String,
    calidad: Number,
    cantidad: Number
    },
    {
        versionKey: false
    }
)
module.exports = mongoose.model('Item', itemSchema)