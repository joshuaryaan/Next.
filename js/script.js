

$(document).ready(function () {  
    
    $(".close").hide();
    $(".listContainer ul li").hide();
    
    $(".open").click(function() {
        $( this ).hide();
        $(".close").show();
        $(".page").css({
            "transform": "perspective( 100vw ) rotateY( 16deg )",
            "transform-origin": "left" 
        });
        $(".listContainer ul li").delay(250).each(function(i) {
            $(this).delay(200 * i).fadeIn(700);
        });
    });
    
    $(".close").click(function() {
        $( this ).hide();
        $(".open").show();
        /*$($(".listContainer ul li").get().reverse()).each(function(i) {
            $(this).delay(200 * i).fadeOut(700);
        });*/
        setTimeout(function() { 
            $(".page").css({
                "transform": "perspective( 100vw ) rotateY( 0deg )",
                "transform-origin": "left" 
            }); 
        }, 0);  
        $(".listContainer ul li").delay(400).hide(0);
    });
    
 
    
});