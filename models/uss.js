var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ussSchema = new Schema({
    /* campo implicito '_id' */
    nombre: String,
    apellido: String,
    email: String,
    password: String
});
// aca creamos un objeto mongoose vasado con la clase uss
var ussModel = mongoose.model('Uss', ussSchema);

module.exports = ussModel;