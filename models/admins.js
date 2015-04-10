var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    email: String,
    password: String
});

var adminModel = mongoose.model('Admins', adminSchema);

module.exports = adminModel;