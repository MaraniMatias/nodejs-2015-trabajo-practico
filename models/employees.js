var hash ='sha256';//md5 sha512 sha256
var crypto = require('crypto');
var mongoose = require('mongoose');
var patterns = require('./patterns.js')
var config = require('../config.js');
var urlPhoto = 'http://'+config.app.domain+':'+config.app.port + '/img/avatar_nodejs.png' ;
var Schema = mongoose.Schema;
var employeesSchema = new Schema({
    name : String,
    surname : String,
    email : {type : String , unique: true },
    password : String,
    provider : {type : String, default: 'local' },
    provider_id : String ,
    photo : {type: String, default: urlPhoto },
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

var employeesModel = mongoose.model('Employees', employeesSchema);

employeesModel.schema.path('password').validate(function (value) {
  if(this._di!=null){
      if(this.email == "admin@admin.com" ){
          return patterns.number.test(value);
      }else{
          return patterns.password.test(value);
      }
  }
}, 'Please insert a valid password.');

employeesModel.schema.path('email').validate(function (value) {
  if(this.provider_id==null){
  return patterns.email.test(value)
  }
}, 'Please insert a valid email address');

employeesModel.schema.path('name').validate(function (value) {
  return patterns.alpha.test(value);
}, 'Only letters allowed for name.');

employeesModel.schema.path('surname').validate(function (value) {
  return patterns.alpha.test(value);
}, 'Only letters accepted for surname.');

module.exports = employeesModel;