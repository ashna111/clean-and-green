var express=require("express");
var router =express.Router();
var Drive=require("../models/drive");
var Comment=require("../models/comment");
var middleware=require("../middleware");

// router.get("/drives/:id/comments/new", middleware.isLoggedIn, function(req, res){
//     Drive.findById(req.params.id, function(err, drive){
//         if(err){
//             console.log(err);
//         } else{
//             res.render("comments/new", {drive: drive}); 
//         }
//     });
// })

//comment create
router.post("/drives/:id/comments", middleware.loggedIn, function(req, res){
    Drive.findById(req.params.id, function(err, drive){
        if(err){
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    drive.comments.push(comment);
                    drive.save();
                    res.redirect("/drives/"+ drive._id);
                }
            })
        }
    })
})

// //comments edit
// router.get("/drives/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
//     Comment.findById(req.params.comment_id,  function(err, foundComment){
//         if(err){
//             res.redirect("back");
//         } else {
//             res.render("comments/edit", {drive_id:req.params.id, comment: foundComment});
//         }
//     })
// });

// //comment update
// router.put("/drives/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
//     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
//         if(err){
//             res.redirect("back");
//         } else {
//             res.redirect("/drives/"+req.params.id);
//         }           
//     })
// });

// //destroy comment
// router.delete("/drives/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
//     Comment.findByIdAndRemove(req.params.comment_id, function(err){
//         if(err){
//             res.redirect("back");
//         } else {
//             req.flash("success", "Comment deleted successfully!");
//             res.redirect("/drives/"+req.params.id);
//         }
//     });
// })


module.exports =router;