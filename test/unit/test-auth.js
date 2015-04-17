var Employess = require('../../models/employees.js')
var mongoose = require('mongoose');
var config = require('../../config.js')
mongoose.connect(config.mongoDB.url);

var a = new Employess({ email:"admin@admin.com", password: "123456" });
a.save(function(err, doc){
    console.log(err, doc);    

    console.log("PasswordOK", a.authenticate("123456"));
    console.log("PasswordFAIL", a.authenticate("incorrect"));
});
