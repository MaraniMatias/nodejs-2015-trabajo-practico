var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeesSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String
});

employeesSchema.pre("save", function(next, done) {
    if(false)
         done();
  next();
});

var employeesModel = mongoose.model('Employees', employeesSchema);

module.exports = employeesModel;