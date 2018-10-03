$(document).ready(function(){
    
//   $(".do").click(function(){
//         $("#do").fadeIn(3000);
//     });
    
//     $(".dont").click(function(){
//         $("#dont").fadeIn(3000);
//     });
    
    $("#faderHome").fadeIn(3000);
    
    $(".ds-read").click(function(){
        $(".ds-venue").toggle();
    })
    
    $(".addComment").click(function(){
        $("#newComment").append(" <br>Appended text");
    });
});


