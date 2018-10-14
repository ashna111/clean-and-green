$(document).ready(function(){
    $("#faderHome").fadeIn(3000);
    
    $(".ds-read").click(function(){
        $(".ds-venue").toggle();
    })
    
    $("#addComment").click(function(){
        $("#addComment").hide();
        $("#commentForm").show();
    });
    
});


