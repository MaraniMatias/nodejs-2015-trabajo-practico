var hash ='sha256';//md5 sha512 sha256
var crypto = require('crypto');
var mongoose = require('mongoose');
var patterns = require('./patterns.js')
var Schema = mongoose.Schema;
var employeesSchema = new Schema({
    name : String,
    surname : String,
    email : String,
    password : String,
    provider : {type : String, default: 'local' },
    provider_id : {type :String, unique: true },
    photo : String,
    createdAt : {type: Date, default: Date.now}
});

employeesSchema.method("valodaPassword", function() {
     return patterns.password.test(this.password);
});

employeesSchema.method("valodaEmail", function() {
  var mierr;
  // mirar si este email ya esta en la base de datos.
  if(this.email == 'admins@admin.com'){
    return = new Error('That email is already in use.');
  };
  if(patterns.email.test(this.email)){
    return = new Error('Please insert a valid email address.');
  };
  return mierr;
});

employeesSchema.method("valodaNameSurname", function() {
  var mierr;
  if(patterns.alpha.test(this.name)){
    mierr = new Error('Only letters allowed');
  };
  if(patterns.alpha.test(this.surname))){
    mierr = new Error('Only letters allowed');
  };
  return mierr;
});



employeesSchema.pre("save", function(next) {
    if(this.isModified('password'))
      this.password = crypto.createHash(hash).update(this.password).digest("hex");
    next();
});

employeesSchema.method('authenticate', function(password) {
    return crypto.createHash(hash).update(password).digest("hex") === this.password;
});

employeesSchema.statics.customMethod = function (paramid, cb) {
  var Employees = this;
  Employees.findOne({ _id: paramid}, function(err, Employees){
      cb(err, Employees);
  });
}

var employeesModel = mongoose.model('Employees', employeesSchema);

module.exports = employeesModel;