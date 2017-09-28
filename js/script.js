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
    
    $(window).resize(function() {
        $("body, .page, .menu").css({ height: window.innerHeight });
    });
        
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

   //PLAY
    $(".player .play").click(function() {
        $(".play").hide(); 
        $(".pause").show();     
    }); 
    //PAUSE
    $(".player .pause").click(function() {
        $(".pause").hide(); 
        $(".play").show();     
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
   $(".open").fadeOut(100);
    $(".close").delay(100).fadeIn(300);
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
    $($(".grid li").get().reverse()).each(function(i) {
        $(this).delay(200 * i).animate({opacity: 0}, 700, function() { });
    });
    $(".search").delay(1800).fadeIn(400);
}

window.addEventListener("orientationchange", function() {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    document.documentElement.innerHTML = document.documentElement.innerHTML;
  }
}, false);

