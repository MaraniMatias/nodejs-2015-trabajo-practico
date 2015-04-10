var hash ='sha512';//md5 sha512
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var adminSchema = new Schema({
    email: String,
    password: String
});

adminSchema.pre("save", function(next) {
    if(this.isModified('password'))
        this.password = crypto.createHash(hash).update(this.password).digest("hex");
    next();
});

adminSchema.method('authenticate', function(password) {
    return crypto.createHash(hash).update(password).digest("hex") === this.password;
});

var adminModel = mongoose.model('Admins', adminSchema);

module.exports = adminModel;