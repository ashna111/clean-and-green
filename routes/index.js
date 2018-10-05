var express=require("express");
var router=express.Router();
var User=require("../models/user");
var passport=require("passport"),
    localStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose");
    
//Auth Routes
router.get("/register",function(req,res){
	res.render("auth/register");
});

router.post("/register", function(req, res){
    var newUser=new User({username: req.body.username, email: req.body.email, age: req.body.age});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.redirect("auth/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        });
    });
});

//show login form
router.get("/login",function(req,res){
	res.render("auth/login");
});

//handling login
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/home",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/home");
});

module.exports=router;