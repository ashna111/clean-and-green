var express=require("express");
var router=express.Router();

//Routes
//Landing Page
router.get("/",function(req,res){
	res.render("landing");
});

//Home page
router.get("/home",function(req,res){
	res.render("home");
});

//think-green
router.get("/think-green",function(req, res) {
   res.render("think_green"); 
});

module.exports=router;