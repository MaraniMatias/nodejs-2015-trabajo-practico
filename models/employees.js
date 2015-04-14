var hash ='sha256';//md5 sha512 sha256
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeesSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    provider: String,
    provider_id: {type :String, unique: true },
    photo : String,
    createdAt : {type: Date, default: Date.now}
});

var validar = function(){
  if(false){
    return new Error("no puedes usar ese email");
  }
};

employeesSchema.pre("save", function(next, err) {
  var miErr = validar();
  if(!miErr){  
    if(this.isModified('password'))
      this.password = crypto.createHash(hash).update(this.password).digest("hex");
    next();
  }  
});

employeesSchema.method('authenticate', function(password) {
    return crypto.createHash(hash).update(password).digest("hex") === this.password;
});

var employeesModel = mongoose.model('Employees', employeesSchema);

module.exports = employeesModel;