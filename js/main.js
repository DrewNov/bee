$(document).bind("mobileinit", function(){
    $.mobile.hidePageLoadingMsg();
});
$(document).ready(function(){

    var gameDOM  = $('.game');
    gameDOM.css({'height': window.screen.availHeight-15+'px', 'width': window.height+'px'});

    var metaTag = $('meta[name=viewport]')
    metaTag.attr('content','initial-scale=1, maximum-scale=1, minimum-scale=1')
    console.log(metaTag);
    gameDOM.bind('vclick',function(e){
        gameDOM.css({'backgroundColor': 'green'});
    });
});


