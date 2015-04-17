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
    provider_id : String ,
    photo : String,
    createdAt : {type: Date, default: Date.now}
});

employeesSchema.method('authenticate', function(password) {
  return crypto.createHash(hash).update(password).digest("hex") === this.password;
});

employeesSchema.pre("save", function(next) {
    if(this.isModified('password'))
      this.password = crypto.createHash(hash).update(this.password).digest("hex");
    next();
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
/*
employeesModel.schema.path('password').validate(function (value) {
  //if(value=='123456' && this.email == 'admin@admin.com' ){
  //}else{
    //return patterns.password.test(value);
    return patterns.number.test(value);
  //}
}, 'Please insert a valid password.');
*/
employeesModel.schema.path('email').validate(function (value) {
    return patterns.email.test(value)
}, 'Please insert a valid email address');

employeesModel.schema.path('name').validate(function (value) {
  return patterns.alpha.test(value);
}, 'Only letters allowed for name.');

employeesModel.schema.path('surname').validate(function (value) {
  return patterns.alpha.test(value);
}, 'Only letters accepted for surname.');

module.exports = employeesModel;