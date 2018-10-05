var express=require("express");
var router=express.Router();
var Blog=require("../models/blog");

//Blog
//Blog-Home
router.get("/blog",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log("Error");
        }else{
            res.render("blog/blog",{blogs:blogs});
        }
    });
});

//Blog-New
router.get("/blog/new",function(req, res) {
   res.render("blog/blog_new"); 
});

//Post route to create a new blog
router.post("/blog",function(req,res){
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
router.get("/blog/:id",function(req, res) {
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blog");
        }else{
           res.render("blog/blog_show",{blog:foundBlog});  
        }
    });
});

//Edit blog route
router.get("/blog/:id/edit",function(req, res) {
   Blog.findById(req.params.id,function(err,blogFound){
       if(err){
           console.log(err);
       }else{
           res.render("blog/blog_edit",{blog:blogFound});
       }
   }) 
});

//edit put route
router.put("/blog/:id",function(req,res){
   Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
       if(err){
           res.redirect("/blog");
       }else{
           res.redirect("/blog/"+req.params.id);
       }
   }) ;
});

//delete blog
router.delete("/blog/:id/",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blog");
        }else{
            res.redirect("/blog");
        }
    })
});

module.exports=router;