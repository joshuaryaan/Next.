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
    $(".grid").hide();
    
    $(document).bind('touchmove', function(e) {
        e.preventDefault();
    });
        
     $("form").submit(function(e){
        e.preventDefault();
    });
    
    $('.fsearch').keypress(function(e){
        if(e.which == 13){
            $(".fsearch").blur();
            $(".search").fadeOut(400);
            $(".grid").show();
            $(".grid li").delay(400).each(function(i) {
            $(this).delay(200 * i).animate({opacity: 1}, 700, function() { });
        });
            setTimeout(function() {
                showPlayer();
            }, 1200);
            
        }
    });
    
   //PLAY
    $(".player .play").click(function() {
        // TRIGGER LOADING EVENT
        if(audio.currentTime < 1){
            trackLoading();
        }
        //
        $(".play").hide(); 
        $(".pause").show();
        audio.play();
        showDuration();
        showLength();
    }); 
    
    //PLAY FROM GRID
    $('#playlist li').click(function(){
        // TRIGGER LOADING EVENT
        
            trackLoading();
        
        //
        audio.pause();
        initAudio($(this));
        $('.play').hide();
        $('.pause').show();
        audio.play();
        showDuration();
        showLength();
        shuffle();
    });
    
    //PAUSE
    $(".player .pause").click(function() {
        $(".pause").hide(); 
        $(".play").show();
        audio.pause();
    });
    
    //SKIP
    $('.player .skip').click(function(){
        // TRIGGER LOADING EVENT
        
            trackLoading();
        
        //
        audio.pause();
        $(".play").hide(); 
        $(".pause").show();
        var next = $('#playlist li.active').next();
        if(next.length == 0){
            next = $('#playlist li:first-child');
        }
        initAudio(next);
        audio.play();
        showDuration();
        showLength();
        shuffle();
    });
    
    //AUDIO TESTS
    
    //Time/Duration
    function showDuration(){
        $(audio).bind('timeupdate',function(){
            //Get hours and minutes
            var s = parseInt(audio.currentTime % 60);
            var m = parseInt(audio.currentTime / 60) % 60;
            if(s < 10){
                s = '0'+s;
            }
            $('.current').html(m + ':'+ s);
            var value = 0;
            if(audio.currentTime > 0){
                value = Math.floor((100 / audio.duration) * audio.currentTime);
                //CEASE LOADING EVENT
                $(".albumArt").stop();
                //
            }
            $('.songPosition').css('width',value+'%');
        });
    }
    
    //Time/Duration
    function showLength(){
        $(audio).bind('timeupdate',function(){
            //Get hours and minutes
            var s = parseInt(audio.duration % 60);
            if (isNaN(s)) s = 00;
            var m = parseInt(audio.duration / 60) % 60;
            if (isNaN(m)) m = 0;
            if(s < 10){
                s = '0'+s;
            }
            $('.duration').html(m + ':'+ s);
        });
    }
    
    var audio
    
    initAudio($('#playlist li:first-child'));
    
    function initAudio(element){
        var song = element.attr('song');
        var title = element.attr('title');
        var cover = element.attr('cover');
        var artist = element.attr('artist');
        
    audio = new Audio('media/'+ song);
        
    $('.artist').text(artist);
	$('.title').text(title);
        
    $('img.cover').attr('src','img/covers/'+cover);
        
    $('#playlist li').removeClass('active');
	element.addClass('active');
    
    } 
    
    //SKIP WHEN SONG ENDS
    audio.onended = function() {
        // TRIGGER LOADING EVENT
        
            trackLoading();
        
        //
        audio.pause();
        $(".play").hide(); 
        $(".pause").show();
        var next = $('#playlist li.active').next();
        if(next.length == 0){
            next = $('#playlist li:first-child');
        }
        initAudio(next);
        audio.play();
        showDuration();
        showLength();
        shuffle();
    };
    
});

function showPlayer() {
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
    
        if ($(window).width() >= 700) {  
            $(".page").css({
                "transform": "perspective( 100vw ) rotateY( 16deg )",
                "transform-origin": "left" 
            });
        } else { 
            $(".page").css({
                "transform": "perspective( 100vw ) rotateY( 26deg )",
                "transform-origin": "left" 
            });
        } 
    
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
    $($(".grid li:visible").get().reverse()).each(function(i) {
        $(this).delay(200 * i).animate({opacity: 0}, 700, function() { });
    });
    $(".grid").delay(1800).hide(0);
    $(".search").delay(1800).fadeIn(400);
}

function shuffle() {
    var parent = $("#playlist");
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
    $('#playlist').find('.active').insertAfter('#playlist li:eq(8)');
}

window.addEventListener("orientationchange", function() {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    document.documentElement.innerHTML = document.documentElement.innerHTML;
  }
}, false);

function trackLoading() {
    $(".albumArt").animate({opacity:'-=0.3'}, 600);
    $(".albumArt").animate({opacity:'+=1'}, 600, trackLoading);
}