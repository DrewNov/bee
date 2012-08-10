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
        console.log(e);
        objectBug.bugMove(e);

    });

    gameDOM.bind('vmouseup',function(e){
        objectBug.bugStopMove();
        console.log('---STOP');
    });

    //----------keyboard--------
//    $('*').bind('keydown',function(e){
//        console.log('---START');
//        var key = e.which;
//        var newE = {clientX: 0};
//
//        if (key == 37) {newE.clientX = -3000}
//        if (key == 39) {newE.clientX = 3000}
//
//        clearInterval(id_interval);
//        id_interval = setInterval(function(){moveBug(newE)}, time_interval);
//    });
//
//    $('*').bind('keyup',function(e){
//        clearInterval(id_interval);
//        console.log('---STOP');
//    });
});


