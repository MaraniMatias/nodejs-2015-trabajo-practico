var hash ='sha256';//md5 sha512 sha256
var crypto = require('crypto');
var mongoose = require('mongoose');
var patterns = require('./patterns.js')
var Schema = mongoose.Schema;
var employeesSchema = new Schema({
    name : String,
    surname : String,
    email : {type : String , unique: true },
    password : String,
    provider : {type : String, default: 'local' },
    provider_id :String ,//  {type :String ,unique: true },
    photo : String,
    createdAt : {type: Date, default: Date.now}
});
var Employees = mongoose.model('Employees', employeesSchema);

Employees.schema.path('password').validate(function (value) {
  return patterns.password.test(value);
}, 'Please insert a valid password.');

Employees.schema.path('email').validate(function (value) {
    return patterns.email.test(value)
}, 'Please insert a valid email address');
Employees.schema.path('email').validate(function (value) {
  // mirar si este email ya esta en la base de datos.
  return this.email != 'admins@admin.com';
}, 'That email is already in use.');

Employees.schema.path('name').validate(function (value) {
  return patterns.alpha.test(value);
}, 'Only letters allowed for name.');

Employees.schema.path('surname').validate(function (value) {
  return patterns.alpha.test(value);
}, 'Only letters accepted for surname.');


employeesSchema.pre("save", function(next) {
    if(this.isModified('password'))
      this.password = crypto.createHash(hash).update(this.password).digest("hex");
    next();
});

employeesSchema.method('authenticate', function(password) {
    return crypto.createHash(hash).update(password).digest("hex") === this.password;
});
/*
employeesSchema.statics.customMethod = function (paramid, cb) {
  var Employees = this;
  Employees.findOne({ _id: paramid}, function(err, Employees){
      cb(err, Employees);
  });
};
*/

var employeesModel = mongoose.model('Employees', employeesSchema);
module.exports = employeesModel;