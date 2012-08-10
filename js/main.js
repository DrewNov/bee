$(document).bind("mobileinit", function(){
    $.mobile.hidePageLoadingMsg();
});

$(document).ready(function(){
    var gameDOM  = $('.game');
    var el = document.getElementById('gameBug')
        , rfs = // for newer Webkit and Firefox
            el.requestFullScreen
                || el.webkitRequestFullScreen
                || el.mozRequestFullScreen
                || el.msRequestFullScreen
        ;
    if(typeof rfs!="undefined" && rfs){
        rfs.call(el);
    }

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
    var id_interval = 0;
    bug = $('.bug');
    gameDOM.bind('vmousedown',function(e){
        console.log('---START');
        clearInterval(id_interval);
        id_interval = setInterval(function(){moveBug(e)}, 0);
    });

    gameDOM.bind('vmouseup',function(){
        clearInterval(id_interval);
        console.log('---STOP');
    });
});


