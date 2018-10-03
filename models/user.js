var mongoose=require('mongoose');
var localStrategy=require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username:String,
    password: String, 
    email: String,
    age: Number
});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User", userSchema);