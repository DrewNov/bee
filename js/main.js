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
    audio.loop=true;
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
    var navDom = $('.nav');
    var metaTag = $('meta[name=viewport]')
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    var width =  (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var scaleCof = height/514;

    gameDOM.css({'height':height, 'width': 800*scaleCof});
    navDom.css({'height':height, 'width': ((width-800*scaleCof)/2)});
    metaTag.attr('content','height=device-height, maximum-scale=1,minimum-scale=1, initial-scale=1, user-scalable=no');

    var objectBug = new bug({idGameBlock:'gameBug'});

    //----------for-testing--------
    var pos = navigator.appVersion.toLowerCase().search('android') + 8;
    var androidVersion = navigator.appVersion.substr(pos,3);
    if (androidVersion == '2.2' || androidVersion == '2.3') {
        objectBug.trans = '';
        objectBug.bugDom.css({'-webkit-transform':'scaleX(-1)'});
    } else {
        objectBug.bugDom.css({
            '-webkit-backface-visibility':'hidden',
            '-webkit-perspective':'1000',
            '-webkit-transform':'translate3d(0,0,0) scaleX(-1)'
        });
    }

    gameDOM.append('<div id="test1" style="position: absolute; right: 0px; top: 0px"></div>');
    gameDOM.append('<div id="test2" style="position: absolute; right: 0px; top: 20px"></div>');
    gameDOM.append('<div id="test3" style="position: absolute; right: 0px; top: 40px"></div>');
    gameDOM.bind('vmousemove',function(e){
        $('#test1').html('X:' + e.offsetX + '   Y:' + e.offsetY);
    });

    //----------score-bar--------
    gameDOM.append('<div id="level" style="position: absolute; left: 0px; top: 20px">Level: 1</div>');
    gameDOM.append('<div id="eaten" style="position: absolute; left: 0px; top: 40px">Eaten: 0</div>');
    gameDOM.append('<div id="lifes" style="position: absolute; left: 0px; top: 60px">Lifes: 3</div>');

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
//    $(window).bind('acc', function(e) {
//        //console.log(e.originalEvent.beta);
//        console.log('accX', e.accX);
//        objectBug.bugMoveAcc(e);
//    });
});


