$(document).bind("mobileinit", function(){
    $.mobile.hidePageLoadingMsg();
});

$(document).ready(function(){
    var gameDOM  = $('.game');
    gameDOM.css({'height': window.screen.availHeight-15+'px', 'width': window.height+'px'});
    var metaTag = $('meta[name=viewport]')
    metaTag.attr('content','width=device-width, initial-scale=1.0, user-scalable=no')

    var objectBug = new bug({idGameBlock:'gameBug'});
    var id_interval = 0;
    halfWidth = window.screen.width / 2;
    stopWidth = gameDOM.width(); // - bugWidth;
    bug = $('.bug');
    turn = -1;
    step = 5;
    time_interval = 0;

    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);

    gameDOM.bind('vmousedown',function(e){
        console.log('---START');
        clearInterval(id_interval);
        id_interval = setInterval(function(){moveBug(e)}, time_interval);
    });

    gameDOM.bind('vmouseup',function(e){
        clearInterval(id_interval);
        console.log('---STOP');
    });

    //----------keyboard--------
    $('*').bind('keydown',function(e){
        console.log('---START');
        var key = e.which;
        var newE = {clientX: 0};

        if (key == 37) {newE.clientX = -3000}
        if (key == 39) {newE.clientX = 3000}

        clearInterval(id_interval);
        id_interval = setInterval(function(){moveBug(newE)}, time_interval);
    });

    $('*').bind('keyup',function(e){
        clearInterval(id_interval);
        console.log('---STOP');
    });
});


