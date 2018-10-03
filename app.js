var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var methodOverride=require('method-override');
var moment=require('moment');
var passport=require("passport"),
    localStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose");

//DB connection
mongoose.connect("mongodb://localhost/cng");

//Models
var Blog=require('./models/blog');
var Drive=require('./models/drive');
var User=require('./models/user');

//Configuration
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//Passport config
app.use(require("express-session")({
    secret:"Clean and green is best!",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    next();
});

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
    var author={
       id:req.user._id,
       username: req.user.username
   }
    
    var newBlog={bTitle:name,bImage:image,bContent:content, author:author};
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

//Edit blog route
app.get("/blog/:id/edit",function(req, res) {
   Blog.findById(req.params.id,function(err,blogFound){
       if(err){
           console.log(err);
       }else{
           res.render("blog/blog_edit",{blog:blogFound});
       }
   }) 
});

//edit put route
app.put("/blog/:id",function(req,res){
   Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
       if(err){
           res.redirect("/blog");
       }else{
           res.redirect("/blog/"+req.params.id);
       }
   }) ;
});

//delete blog
app.delete("/blog/:id/",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blog");
        }else{
            res.redirect("/blog");
        }
    })
});

//Drives Routes
//display all drives
app.get("/drives",function(req, res) {
    Drive.find({},function(err,drives){
        if(err){
            console.log("Error");
        }else{
           res.render("drives/drives",{drives:drives});  
        }
    });
});

//Form to create New drive
app.get("/drives/new",function(req, res) {
  res.render("drives/drives_new");  
});

//Add a new drive to db
app.post("/drives",function(req,res){
    var newDrive={dTitle:req.body.title, dbanner:req.body.banner, dvenue:req.body.venue, dContent:req.body.body, dLocation:req.body.location,dDate:req.body.date};
    Drive.create(newDrive,function(err, newlyCreatedDrive){
        if(err){
           console.log("Error");
        } else{
           res.redirect("/drives");
       }
   });
});

//details drive
app.get("/drives/:id",function(req, res) {
    Drive.findById(req.params.id,function(err,foundDrive){
        if(err){
            res.redirect("/drives");
        }else{
           res.render("drives/drives_show",{drive:foundDrive});  
        }
    });
});

//Edit drive route
app.get("/drives/:id/edit",function(req, res) {
   Drive.findById(req.params.id,function(err,driveFound){
       if(err){
           console.log(err);
       }else{
           var newDate = moment(driveFound.dDate).utc().format("YYYY-MM-DD");
           res.render("drives/drives_edit", {drive:driveFound, newDate: newDate});
       }
   }) 
});

//edit put drive route
app.put("/drives/:id",function(req,res){
   Drive.findByIdAndUpdate(req.params.id,req.body.drive,function(err,updatedDrive){
       if(err){
           res.redirect("/drives");
       }else{
           res.redirect("/drives/"+req.params.id);
       }
   }) ;
});

//delete drive
app.delete("/drives/:id/",function(req,res){
    Drive.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/drives");
        }
    })
});

// //Recycle Waste
// app.get("/recycle",function(req, res) {
//   res.render("recycle"); 
// });

//think-green
app.get("/think-green",function(req, res) {
   res.render("think_green"); 
});

//Dispose Waste - Dumpster
app.get("/dumpster", function(req, res) {
    res.render("dumpster");
});

//Auth Routes
app.get("/register",function(req,res){
	res.render("auth/register");
});

app.post("/register", function(req, res){
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
app.get("/login",function(req,res){
	res.render("auth/login");
});

//handling login
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/home",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/home");
});


app.listen(process.env.PORT,process.env.IP,function(){
	console.log("Welcome to Clean And Green!");
});