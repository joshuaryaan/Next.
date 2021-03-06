$(document).ready(function () {  
    
    //MENU
    $(".close").hide();
    //$(".listContainer ul li").hide();
    
    $(".menuButton").click(function() {
        if($('.open').is(':visible')) {
            openMenu();
        } else {
            closeMenu();   
        };
    });
    
    $(".page").click(function() {
        closeMenu();
    });
    
    $(window).keydown(function (e) {
        if($(".close").is(":visible")) {
          if (e.keyCode === 27) {
            e.preventDefault();
            closeMenu();
          }
        }
    });
    
    var menuSkip = $(".menuSkip").detach();

    //HOME
    $(".home").click(function() {
        newSearch();    
    });
    
    //MENU OPTIONS
    $(".menu .new").click(function() {
        newSearch();    
    });
    
    $(".menu .history").click(function() {
        $(".historyList").toggle();  
    });
    
    $(".menu .disclaimer").click(function() {
        $(".disclaimerNote").toggle();  
    });
    
    //BACK TO PLAYLIST
    $(".albumArt").click(function() {
        launchPlaylist();    
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
    
    var options = {
        data: [
                "Nikes - Frank Ocean",
                "Feels - Calvin Harris",
                "I'll Call U Back - Erykah Badu",
                "The Waters - Anderson .Paak",
                "Incomplete Kisses - Sampha",
                "Hands Up - Blood Orange",
                "Am I Wrong - Anderson .Paak",
                "Best to You - Blood Orange",
                "Embarcadero - Toro y Moi",
                "Nights - Frank Ocean",
                "Girl Like You - Toro y Moi",
                "Heatstroke - Calvin Harris",
                "Plastic 100&#176;C - Sampha",
                "U Use to Call Me - Erykah Badu",
                "Disciples - Tame Impala",
                "Gossip - Tame Impala",
                "Brazil - Declan McKenna",
                "Bethlehem - Declan Mckenna",
                "Frank Ocean",
                "Calvin Harris",
                "Erykah Badu",
                "Anderson .Paak",
                "Blood Orange",
                "Toro y Moi",
                "Tame Impala",
                "Declan McKenna"
                ],
        list: {
            
            onClickEvent: function() {
                var str = $(".selected").text();
                if (str.indexOf('-') >-1) {
                    var toPlay = str.split(' - '); 
                    //alert( "Song: " + toPlay[0]);
                    launchPlaylist();
                    $('#playlist li').removeClass('active');
                    $('#playlist li[title="'+toPlay[0]+'"]').addClass('active');
                    audio.pause();
                    initAudio($('#playlist li[title="'+toPlay[0]+'"]'));
                    playTrack();
                    trackLoading();
                    $('.active').find("p").clone().prependTo(".historyList");
                    $(".placeholder").hide();
                    audio.onended = function() {
                        nextTrack();
                    };
                } 
                else {
                    var toPlay = str ; 
                    //alert( "Artist: " + toPlay );
                    launchPlaylist();
                    $('#playlist li').removeClass('active');
                    $('#playlist li[artist="'+toPlay+'"]').addClass('active');
                    audio.pause();
                    initAudio($('#playlist li[artist="'+toPlay+'"]'));
                    playTrack();
                    trackLoading();
                    $('.active').find("p").clone().prependTo(".historyList");
                    $(".placeholder").hide();
                    audio.onended = function() {
                        nextTrack();
                    };
                };
                
                
                
                //alert( toPlay[0]);
                
            },
            
            match: {
                enabled: true
            },
            
            showAnimation: {
                type: "slide", //normal|slide|fade
                time: 400,
                callback: function() {}
            },

            hideAnimation: {
                type: "slide", //normal|slide|fade
                time: 400,
                callback: function() {}
            }
            
        }
    };

    $(".fsearch").easyAutocomplete(options);
    
    /*$('.fsearch').keypress(function(e){
        if(e.which == 13){
            launchPlaylist();
        }
    });*/
    
   //PLAY
    $(".player .play").click(function() {
        if(audio.currentTime < 1){
            trackLoading();
        }
        playTrack();
    }); 
    
    //PLAY FROM GRID
    $('#playlist li').click(function(){
        trackLoading();
        audio.pause();
        initAudio($(this));
        $(".grid").animate({opacity: 0}, 400, function() { });
        setTimeout(function() {
            shuffle();
        }, 400);
        //upcoming();
        $(".grid").animate({opacity: 1}, 600, function() { });
        playTrack();
        $('.active').find("p").clone().prependTo(".historyList");
        audio.onended = function() {
            nextTrack();
        };
    });
    
    //PAUSE
    $(".player .pause").click(function() {
        pauseTrack();
    });
    
    $(window).keypress(function (e) {
      if (e.keyCode === 0 || e.keyCode === 32) {
        //e.preventDefault()
        if($(".player").is(":visible")) {
            if($(".play").is(":visible")) {
                playTrack();
            } 
            else {
                pauseTrack();
            }
      }
      }
    })
    
    //SKIP
    $('.player .skip').click(function(){
        nextTrack();
    });
    
    $('.menu ul').on('click', '.menuSkip', function() {
         nextTrack();
    });
    
    $(window).keydown(function (e) {
        if($(".player").is(":visible")) {
          if (e.keyCode === 39) {
            e.preventDefault();
            nextTrack();
          }
        }
    });
    
    //Position
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
                $(".albumArt").animate({opacity: 1}, 300);
                $(".songLength").stop()
                $(".songLength").css({backgroundColor:'#e6e6e6', opacity: '1'});
                //
            }
            $('.songPosition').css('width',value+'%');
        });
    }
    
    //Duration
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
    
    //initAudio($('#playlist li:first-child'));
    initAudio($('#playlist .active'));
    
    function initAudio(element){
        var song = element.attr('song');
        var title = element.attr('title');
        var cover = element.attr('cover');
        var artist = element.attr('artist');
        
    audio = new Audio('media/'+ song);
    
    

    $('.songs').each(function () {
        $(this).append(names);
    });
        
    $('.artist').text(artist);
	$('.title').text(title);
        
    $('img.cover').attr('src','img/covers/'+cover);
        
    $('#playlist li').removeClass('active');
	element.addClass('active');   
        
    }
    
    //SKIP WHEN SONG ENDS
    audio.ended = function() {
        nextTrack();
    };
    
    function launchPlaylist() {
        $(".fsearch").blur();
        $(".homeWrapper").fadeOut(400);
        $(".grid").show();
        $(".grid li").delay(400).each(function(i) {
            $(this).delay(200 * i).animate({opacity: 1}, 700, function() { });
        });
        setTimeout(function() {
            showPlayer();
        }, 1200);
    }
    
    function playTrack() {
        $(".play").hide(); 
        $(".pause").show();
        audio.play();
        showDuration();
        showLength();
        $(".menu ul").prepend(menuSkip);
        upcoming();
    }
    
    function pauseTrack() {
        $(".pause").hide(); 
        $(".play").show();
        audio.pause();
        //trial this
        /*$(".albumArt").stop();
        $(".albumArt").animate({opacity: 1}, 700);*/
    }

    function nextTrack() {
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
        $(".grid").animate({opacity: 0}, 400, function() { });
        setTimeout(function() {
            shuffle();
        }, 400);
        upcoming();
        $(".grid").animate({opacity: 1}, 600, function() { });
        audio.onended = function() {
            nextTrack();
        };
        $('.active').find("p").clone().prependTo(".historyList");
    }
    
    function shuffle() {
        //$(".grid").animate({opacity: 0}, 200, function() { });
        var parent = $("#playlist");
        var divs = parent.children();
            while (divs.length) {
                parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
            }
        $('#playlist').find('.active').insertAfter('#playlist li:eq(6)');
        //$(".grid").delay(400).animate({opacity: 1}, 200, function() { });
    }

    function upcoming() {
        //var kip = $('#playlist li.active').next();
        //    if(next.length == 0){
        //        next = $('#playlist li:first-child');
        //    };
        $(".nextSong").html($('.active').next().find("p:first-of-type").clone());
        $(".nextArtist").html($('.active').next().find("p:nth-of-type(2)").clone());
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
                    "transform": "perspective( 100vw ) rotateY( 32deg )",
                    "transform-origin": "left" 
                });
            } 

        $(".listContainer ul li").delay(250).each(function(i) {
            $(this).delay(200 * i).animate({opacity: 1}, 700, function() { });
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
        $(".listContainer ul li").delay(400).animate({opacity: 0}, 50, function() { });
        $(".historyList").delay(600).hide(0);
    }
    
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
            
    if($(".pause").is(":visible")) {
        //nothing
    } 
    else {
        setTimeout(function() {
            hidePlayer();
        }, 1000);
    }
    
    $(".listContainer ul li").delay(400).animate({opacity: 0}, 50, function() { });
    $($(".grid li:visible").get().reverse()).each(function(i) {
        $(this).delay(200 * i).animate({opacity: 0}, 700, function() { });
    });
    $(".grid").delay(1800).hide(0);
    $(".homeWrapper").delay(1800).fadeIn(400);
}


/*window.addEventListener("orientationchange", function() {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    document.documentElement.innerHTML = document.documentElement.innerHTML;
  }
}, false);*/

function trackLoading() {
    $(".albumArt").animate({opacity:'-=0.5'}, 600);
    $(".albumArt").animate({opacity:'+=1'}, 600, trackLoading);
    $(".songLength").css({backgroundColor:'#b3b3b3'});
    $(".songLength").animate({opacity:'-=0.45'}, 600);
    $(".songLength").animate({opacity:'+=1'}, 600, trackLoading);
}