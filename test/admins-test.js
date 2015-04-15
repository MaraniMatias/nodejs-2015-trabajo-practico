var Employees = require('../models/employees');
var mongoose = require('mongoose');

console.log(mongoose.connect('mongodb://localhost/crudtest'));


var a = new Employees({ email:"admin@admin.com", password: "123456" });
a.save(function(err, doc){
    console.log(err, doc);    
});

