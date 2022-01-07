var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var itemSchema = new Schema(
    {
     nombre: String,
     precio: Number,
    demanda: Number,
    calidad: Number
    }
)

itemSchema.pre(['find', 'findOne'], function() {
    this.select('_id nombre precio demanda calidad')
})
module.exports = mongoose.model('Item', itemSchema)