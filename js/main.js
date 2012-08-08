$(document).bind("mobileinit", function(){
    $.mobile.hidePageLoadingMsg();
});

$(document).ready(function(){
    bug = $('.bug');
    var gameDOM  = $('.game');
    gameDOM.css({'height': window.screen.availHeight-15+'px', 'width': window.height+'px'});
    var metaTag = $('meta[name=viewport]')
    metaTag.attr('content','initial-scale=1, maximum-scale=1, minimum-scale=1')

    var objectBug = new bug({idGameBlock:'gameBug'});

    var id_interval = 0;

    gameDOM.bind('vmousedown',function(e){
        console.log('---START');
        clearInterval(id_interval);
        id_interval = setInterval(function(){moveBug(e)}, 0);
        //bug.animate({left: '+=10'}, 100, 'linear');
    });

    gameDOM.bind('vmouseup',function(){
        clearInterval(id_interval);
        //bug.stop();
        console.log('---STOP');
    });
});


