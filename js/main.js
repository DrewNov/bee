$(document).bind("mobileinit", function(){
    $.mobile.hidePageLoadingMsg();
});

$(document).ready(function(){
    var gameDOM  = $('.game');
    var metaTag = $('meta[name=viewport]')
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    var scaleCof = height/514;
    gameDOM.css({'height':height, 'width': 800*scaleCof});
    console.log(gameDOM.height(),gameDOM.width());
    metaTag.attr('content','height=device-height, maximum-scale=1,minimum-scale=1, initial-scale=1, user-scalable=no');
    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);

    var objectBug = new bug({idGameBlock:'gameBug'});

    gameDOM.bind('vmousedown',function(e){
        e.preventDefault();
        objectBug.bugMove(e);

    });

    gameDOM.bind('vmouseup',function(e){
        e.preventDefault();
        objectBug.bugStopMove();
    });
    //console.log('main js'+window.globalGeneratedApple);

    gameDOM.append('<div id="test1" style="position: absolute; right: 0; top: 0"></div>');
    gameDOM.append('<div id="test2" style="position: absolute; right: 0; top: 20px"></div>');
    gameDOM.bind('vmousemove',function(e){
        $('#test1').html('X:' + e.clientX + '   Y:' + e.clientY);
    });

    //----------keyboard--------
    var hold = false;

    $('*').bind('keydown',function(e){
        if ( hold == true ) { return false; }
        hold = true;

//        console.log('---START');
        var key = e.which;
        var newE = {screenX: 0};

        if (key == 37 || key == 39) {
            if (key == 37) {newE.screenX = -9000}
            if (key == 39) {newE.screenX = 9000}

            objectBug.bugMove(newE);
        }
    });

    $('*').bind('keyup',function(e){
        hold = false;
        objectBug.bugStopMove();
//        console.log('---STOP');
    });
/*    $(window).bind('acc', function(e) {
        //console.log('wat');
        //console.log(e.originalEvent.beta);
        console.log(e.accX);
        objectBug.bugMoveAcc(e);

    });*/
});


