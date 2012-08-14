$(document).bind("mobileinit", function(){
    $.mobile.hidePageLoadingMsg();
});

$(document).ready(function(){
    var audio = document.createElement('audio');
    audio.src =("../media/la-la.mp3");
    audio.autobuffer = true;
    audio.load(); // force the audio to start loading...doesn't work in iOS
    audio.play();
    audio.volume="0.1";
    console.log(audio);

    var track = this;

    var progress = function () {
        audio.removeEventListener('progress', progress, false);
        if (track.updateCallback !== null) track.updateCallback();
    };




    audio.addEventListener('progress', progress, false);
    track.updateCallback = null;

    var timer= function(){
        setTimeout(function(){audio.currentTime=0,audio.play()},1);
    };

    var gameDOM  = $('.game');
    var metaTag = $('meta[name=viewport]')
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    var scaleCof = height/514;
    gameDOM.css({'height':height, 'width': 800*scaleCof});
    metaTag.attr('content','height=device-height, maximum-scale=1,minimum-scale=1, initial-scale=1, user-scalable=no');

    var objectBug = new bug({idGameBlock:'gameBug'});

    //----------for-testing--------
    gameDOM.append('<div id="test1" style="position: absolute; right: 0; top: 0"></div>');
    gameDOM.append('<div id="test2" style="position: absolute; right: 0; top: 20px"></div>');
    gameDOM.append('<div id="test3" style="position: absolute; right: 0; top: 40px"></div>');
    gameDOM.bind('vmousemove',function(e){
        $('#test1').html('X:' + e.offsetX + '   Y:' + e.offsetY);
    });

    //----------mouse--------
    $('body').bind('touchmove',function(e){
        e.preventDefault();
    });

    $('body').bind('vmousedown',function(e){
        e.preventDefault();
        objectBug.bugMove(e);
    });

    $('body').bind('vmouseup',function(e){
        e.preventDefault();
        objectBug.bugStopMove();
    });

    //----------keyboard--------
    var hold = false;

    $('body').bind('keydown',function(e){
        if ( hold == true ) { return false; }
        hold = true;
        //console.log('---START');
        var key = e.which;
        var newE = {screenX: 0};

        if (key == 37 || key == 39) {
            if (key == 37) {newE.screenX = -9000}
            if (key == 39) {newE.screenX = 9000}
            objectBug.bugMove(newE);
        }
    });

    $('body').bind('keyup',function(e){
        hold = false;
        objectBug.bugStopMove();
        //console.log('---STOP');
    });

    //----------accelerometer--------
/*    $(window).bind('acc', function(e) {
        //console.log('wat');
        //console.log(e.originalEvent.beta);
        console.log('accX', e.accX);
        objectBug.bugMoveAcc(e);
    });*/
});


