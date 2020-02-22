$(document).ready(function(){
    $("#faderHome").fadeIn(3000);
    
    $(".ds-read").click(function(){
        $(".ds-venue").toggle();
    })
    
    $("#addComment").click(function(){
        $("#addComment").hide();
        $("#commentForm").show();
    });
    
    $("#blog-like").click(function(){
        // console.log("like clicked");
        var id = $("#blog-id").html();
        var data = {
            bTitle: $("#blog-title").html(),
            bImage: $("#blog-image").attr('src'),
            bContent:$("#blog-content").html(),
            bLikes: Number($("#like-count").html())+1,
        }
        // var id= p.html();
        console.log(id);
        console.log(data);
        $.ajax({
            url: '/blog/' + id +"?_method=PUT",
            method: 'POST',
            contentType: 'json',
            data: JSON.stringify(data),
            success: function(response){
                //console.log(response);
            }
        })
    })
});



