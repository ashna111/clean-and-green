var express=require('express');
var app=express();

//Configuration
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

//Routes
//Landing Page
app.get("/",function(req,res){
	res.render("landing");
});

//Home page
app.get("/home",function(req,res){
	res.render("home");
});

//Blog
//Blog-Home
app.get("/blog",function(req,res){
	res.render("blog/blog");	
});

//Blog-New
app.get("/blog/new",function(req, res) {
   res.render("blog/blog_new"); 
});

//Blog-show route
app.get("/blog/:id",function(req, res) {
   res.render("blog/blog_show"); 
});

//Drives Routes
//main
app.get("/drives",function(req, res) {
  res.render("drives/drives");  
});

//New drive
app.get("/drives/new",function(req, res) {
  res.render("drives/drives_new");  
});

//details drive
app.get("/drives/:id",function(req, res) {
  res.render("drives/drives_show");  
});

//Recycle Waste
app.get("/recycle",function(req, res) {
   res.render("recycle"); 
});

//think-green
app.get("/think-green",function(req, res) {
   res.render("think_green"); 
});

//Auth Routes
app.get("/register",function(req,res){
	res.render("auth/register");
});
app.get("/login",function(req,res){
	res.render("auth/login");
});


app.listen(process.env.PORT,process.env.IP,function(){
	console.log("Welcome to Clean And Green!");
});