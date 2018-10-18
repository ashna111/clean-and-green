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
var Comment=require('./models/comment');
var Volunteer=require('./models/volunteer');

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

//Require routes
var staticRoutes=require("./routes/staticRoutes");
var blogRoutes=require("./routes/blog");
var driveRoutes=require("./routes/drive");
var indexRoutes=require("./routes/index");
var commentRoutes=require("./routes/comment");
var volunteerRoutes=require("./routes/volunteer");

//Routes-refactor
app.use(staticRoutes);
app.use(blogRoutes);
app.use(indexRoutes);
app.use(driveRoutes);
app.use(commentRoutes);
app.use(volunteerRoutes);

//Dispose Waste - Dumpster
app.get("/dumpster", function(req, res) {
    res.render("dumpster");
});

//Error route
app.get('*',function(req,res){
   res.render("error"); 
});

// c9environment
app.listen(process.env.PORT,process.env.IP,function(){
	console.log("Welcome to Clean And Green!");
});

// To run locally
// app.listen(3000,function(){
// 	console.log("Welcome to Clean And Green!");
// });