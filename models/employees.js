var hash ='sha512';//md5 sha512
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeesSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String
});

employeesSchema.pre("save", function(next) {
    if(this.isModified('password'))
        this.password = crypto.createHash(hash).update(this.password).digest("hex");
    next();
});

employeesSchema.method('authenticate', function(password) {
    return crypto.createHash(hash).update(password).digest("hex") === this.password;
});

var employeesModel = mongoose.model('Employees', employeesSchema);

module.exports = employeesModel;