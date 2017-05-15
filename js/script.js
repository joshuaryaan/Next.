$(document).ready(function () {  
    
    //MENU
    $(".close").hide();
    $(".listContainer ul li").hide();
    
    $(".open").click(function() {
        openMenu();
    });
    
    $(".close").click(function() {
        closeMenu();
    });
    
    $(".page").click(function() {
        closeMenu();
    });

    //HOME
    $(".home").click(function() {
        newSearch();    
    });
    
    //MENU OPTIONS
    $(".menu .new").click(function() {
        newSearch();    
    });
    
    //PLAYER
    $(".playerWrapper").hide();
    
    //SEARCH
    $(".grid li").css( "opacity", "0" );
    
     $("form").submit(function(e){
        e.preventDefault();
    });
    
    $('.fsearch').keypress(function(e){
        if(e.which == 13){
            $(".search").fadeOut(400);
            $(".grid li").delay(400).each(function(i) {
            $(this).delay(200 * i).animate({opacity: 1}, 700, function() { });
        });
            setTimeout(function() {
                play();
            }, 1200);
            
        }
    });


});

function play() {
  $(".player").animate({
        bottom: "0px"
      }, 400 );
  $(".playerWrapper").fadeIn(1400);  
}

function hidePlayer() {
  $(".player").animate({
        bottom: "-60px"
      }, 400 ); 
    $(".playerWrapper").fadeOut(800);
}

function openMenu() {
   $(".open").hide();
    $(".close").show();
    $(".page").css({
        "transform": "perspective( 100vw ) rotateY( 16deg )",
        "transform-origin": "left" 
    });
    $(".listContainer ul li").delay(250).each(function(i) {
        $(this).delay(200 * i).fadeIn(700);
    }); 
}

function closeMenu() {
    $(".close").hide();
    $(".open").show();
    setTimeout(function() { 
        $(".page").css({
            "transform": "perspective( 100vw ) rotateY( 0deg )",
            "transform-origin": "left" 
        }); 
    }, 0);  
    $(".listContainer ul li").delay(400).hide(0);
}

function newSearch() {
    $('.fsearch').val('');
    $(".close").hide();
    $(".open").show();
    setTimeout(function() { 
        $(".page").css({
            "transform": "perspective( 100vw ) rotateY( 0deg )",
            "transform-origin": "left" 
        }); 
    }, 0);
    setTimeout(function() {
            hidePlayer();
        }, 1000);
    $(".listContainer ul li").delay(400).hide(0);
    $($(".grid li").get().reverse()).delay(400).each(function(i) {
        $(this).delay(200 * i).animate({opacity: 0}, 700, function() { });
    });
    $(".search").delay(2000).fadeIn(400);
}