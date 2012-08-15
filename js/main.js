$(document).bind("mobileinit", function(){
    $.mobile.hidePageLoadingMsg();
});

$(document).ready(function(){

    var gameDOM  = $('.game'),
        navDom = $('.nav'),
        height = (window.innerHeight > 0) ? window.innerHeight : screen.height,
        width =  (window.innerWidth > 0) ? window.innerWidth : screen.width,
        scaleCof = height/514,
        popDivStart;
    gameDOM.css({'height':height, 'width': 800*scaleCof});
    navDom.css({'height':height, 'width': ((width-800*scaleCof)/2)});

    if (height>width){
        alert('Please, rotate your device and refresh web-page...');
    }

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
    });

});


