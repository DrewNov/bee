
$(document).ready(function(){
    var gameHeight = 514;

    var gameDOM  = $('.game');
    gameDOM.css({'height': window.screen.availHeight-15+'px', 'width': window.screen.availWidth-15});

    var metaTag = $('meta[name=viewport]')
    metaTag.attr('content','initial-scale='+scale+', maximum-scale=1, minimum-scale=1')
    console.log(metaTag);
});
