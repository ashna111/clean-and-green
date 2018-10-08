var express=require("express");
var router=express.Router();
var Drive=require("../models/drive");
var middleware=require("../middleware/index");
var moment=require('moment');

//Drives Routes
//display all drives
router.get("/drives",function(req, res) {
    Drive.find({},function(err,drives){
        if(err){
            console.log("Error");
        }else{
           res.render("drives/drives",{drives:drives});  
        }
    });
});

//Form to create New drive
router.get("/drives/new",middleware.loggedIn,function(req, res) {
  res.render("drives/drives_new");  
});

//Add a new drive to db
router.post("/drives",middleware.loggedIn,function(req,res){
    var organiser={
       id:req.user._id,
       username: req.user.username
    }
    var dLocation= req.body.locality+",+"+req.body.area+",+"+req.body.city;
    var newDrive={dTitle:req.body.title, dbanner:req.body.banner, dvenue:req.body.venue, dContent:req.body.body, dLocality:req.body.locality, dArea:req.body.area, dCity: req.body.city, dGeoLocation: dLocation ,dDate:req.body.date, dOrganiser:organiser};
    Drive.create(newDrive,function(err, newlyCreatedDrive){
        if(err){
           console.log("Error");
        } else{
           res.redirect("/drives");
       }
   });
});

//details drive
router.get("/drives/:id",function(req, res) {
    Drive.findById(req.params.id,function(err,foundDrive){
        if(err){
            res.redirect("/drives");
        }else{
            var dDate = moment(foundDrive.dDate).utc().format("DD-MM-YYYY");
            res.render("drives/drives_show",{drive:foundDrive, dDate:dDate });  
        }
    });
});

//Edit drive route
router.get("/drives/:id/edit",middleware.loggedIn,function(req, res) {
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
router.put("/drives/:id",middleware.loggedIn,function(req,res){
    
    var location=req.body.drive.dLocality+",+"+req.body.drive.dArea+",+"+req.body.drive.dCity;
    var newDriveUpdates={
        dTitle:req.body.drive.dtitle, 
        dbanner:req.body.drive.dbanner,
        dvenue:req.body.drive.dvenue, 
        dContent:req.body.drive.dContent,
        dLocality:req.body.dLocality, 
        dArea:req.body.drive.dArea,
        dCity: req.body.drive.dCity,
        dGeoLocation: location ,
        dDate:req.body.drive.dDate
    };

   Drive.findByIdAndUpdate(req.params.id,newDriveUpdates,function(err,updatedDrive){
       if(err){
           res.redirect("/drives");
       }else{
           res.redirect("/drives/"+req.params.id);
       }
   }) ;
});

//delete drive
router.delete("/drives/:id/",middleware.loggedIn,function(req,res){
    Drive.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/drives");
        }
    })
});

module.exports=router;