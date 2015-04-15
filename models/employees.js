var hash ='sha256';//md5 sha512 sha256
var crypto = require('crypto');
var mongoose = require('mongoose');
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

employeesSchema.method('validad', function() {
  if(this.password.length < 3 ){
    return new Error("Password is short.");
  };
});

employeesSchema.pre("save", function(next) {
  //var miErr = Validar();
  //if(!miErr){  
    if(this.isModified('password'))
      this.password = crypto.createHash(hash).update(this.password).digest("hex");
    next();
  //};
});

employeesSchema.method('authenticate', function(password) {
    return crypto.createHash(hash).update(password).digest("hex") === this.password;
});

var employeesModel = mongoose.model('Employees', employeesSchema);

module.exports = employeesModel;