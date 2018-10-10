var express=require("express");
var router =express.Router();
var Drive=require("../models/drive");
var Volunteer=require("../models/volunteer");
var middleware=require("../middleware");

router.post("/drives/:id/volunteer", middleware.loggedIn, function(req, res){
    Drive.findById(req.params.id, function(err, drive){
        if(err){
            console.log(err);
        } else{
            Volunteer.create(req.body.volunteer, function(err, volunteer){
                if(err){
                    console.log(err);
                } else{
                    volunteer.vol.id=req.user._id;
                    volunteer.vol.username=req.user.username;
                    volunteer.save();
                    drive.volunteers.push(volunteer);
                    drive.save();
                    res.redirect("/drives/"+ drive._id);
                }
            })
        }
    })
});

module.exports=router;
