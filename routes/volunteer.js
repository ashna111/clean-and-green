var express=require("express");
var router =express.Router();
var Drive=require("../models/drive");
var Volunteer=require("../models/volunteer");
var middleware=require("../middleware");
var transporter=require("../middleware/mailer");

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
                    volunteer.vol.email=req.user.email;
                    volunteer.save();
                    drive.volunteers.push(volunteer);
                    drive.save();
                    res.redirect("/drives/"+ drive._id);
                    transporter.sendMail({
                        from: 'cleanngreen111@gmail.com',
                        to: req.user.email,
                        subject: 'Volunteer Registration',
                        html: '<b>Thank you for registering as Volunteer!</b><br>Every bit counts!',
                    });
                }
            });
        }
    })
});

module.exports=router;
