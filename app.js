var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var methodOverride=require('method-override');

//DB connection
mongoose.connect("mongodb://localhost/cng");

//Configuration
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//Schema
var blogSchema = new mongoose.Schema({
    bTitle: String,
    bImage: String,
    bContent: String,
    bDate: { type: Date, default: Date.now }
});
var Blog=mongoose.model("Blog", blogSchema);

var driveSchema = new mongoose.Schema({
   dTitle: String,
   dImage: String,
   dContent: String,
   dLocation: String,
   dDate: {type:Date, default: Date.now}
});
var Drive=mongoose.model("Drive", driveSchema);

// Drive.create({
//   dTitle:"Tree Plantation" ,
//   dImage:"https://images.loksatta.com/2018/06/tree-plantation-1.jpg",
//   dContent:"Plant It!",
//   dLocation:"Ghatkopar,Mumbai"
// });



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
    Blog.find({},function(err,blogs){
        if(err){
            console.log("Error");
        }else{
            res.render("blog/blog",{blogs:blogs});
        }
    });
});

//Blog-New
app.get("/blog/new",function(req, res) {
   res.render("blog/blog_new"); 
});

//Post route to create a new blog
app.post("/blog",function(req,res){
    var name=req.body.title;
    var image=req.body.image;
    var content=req.body.body;
    
    var newBlog={bTitle:name,bImage:image,bContent:content};
    Blog.create(newBlog,function(err,newlyCreated){
       if(err){
           console.log("Error");
       } else{
           res.redirect("/blog");
       }
    });
});

//Blog-show route
app.get("/blog/:id",function(req, res) {
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blog");
        }else{
           res.render("blog/blog_show",{blog:foundBlog});  
        }
    });
});

//Drives Routes
//main
app.get("/drives",function(req, res) {
    Drive.find({},function(err,drives){
        if(err){
            console.log("Error");
        }else{
           res.render("drives/drives",{drives:drives});  
        }
    });
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