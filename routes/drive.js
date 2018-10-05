var express=require("express");
var router=express.Router();
var Drive=require("../models/drive");
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
router.get("/drives/new",function(req, res) {
  res.render("drives/drives_new");  
});

//Add a new drive to db
router.post("/drives",function(req,res){
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
router.get("/drives/:id",function(req, res) {
    Drive.findById(req.params.id,function(err,foundDrive){
        if(err){
            res.redirect("/drives");
        }else{
           res.render("drives/drives_show",{drive:foundDrive});  
        }
    });
});

//Edit drive route
router.get("/drives/:id/edit",function(req, res) {
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
router.put("/drives/:id",function(req,res){
   Drive.findByIdAndUpdate(req.params.id,req.body.drive,function(err,updatedDrive){
       if(err){
           res.redirect("/drives");
       }else{
           res.redirect("/drives/"+req.params.id);
       }
   }) ;
});

//delete drive
router.delete("/drives/:id/",function(req,res){
    Drive.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/drives");
        }
    })
});

module.exports=router;