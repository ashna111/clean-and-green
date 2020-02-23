$(document).ready(function(){
    $("#faderHome").fadeIn(3000);
    
    $(".ds-read").click(function(){
        $(".ds-venue").toggle();
    })
    
    $("#addComment").click(function(){
        $("#addComment").hide();
        $("#commentForm").show();
    });
    
    $("#blog-like").click(function(e){
        e.preventDefault();
        // console.log("like clicked");
        var id = $("#blog-id").html();
        var blog = {
            "bTitle": $("#blog-title").html(),
            "bImage": $("#blog-image").attr('src'),
            "bContent":$("#blog-content").html(),
            "bLikes": Number($("#like-count").html())+1,
        }
        console.log(id)
        console.log(blog)
        $.ajax({
            url: '/blog/like/' + id +"?_method=PUT",
            method: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(blog),
            success: function(response){
                //console.log(response);
                $("#like-count").text(blog.bLikes);
            }
        })
    })
});



