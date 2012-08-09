var moveBug = function (e) {
    var halfWidth = window.screen.width / 2;
    var curX = e.clientX;
    var step = 5;
    var bug = $('.bug');
    var bugX = bug.position().left;

    if (curX < halfWidth) {
        console.log('Left');
        if (bugX <= 0) {
            return false;
        }
        bugX -= step;
        flipBug(-1);
    } else {
        console.log('Right');
        if (bugX >= halfWidth * 2 - 45) {
            return false;
        }
        bugX += step;
        flipBug(1);
    }

    bug.css("left", bugX + "px");
}

var flipBug = function (e) {
    var bug = $('.bug');
    var scaleCof = $('#gameBug').height()/514  ;
    var imgBugHeight = 49,
        imgBugWidth = 61,
        bottom = 29;

    if (e == 1) {
        bug.css("background", "url('../img/bug_inv.png') no-repeat");
    } else {
        bug.css("background", "url('../img/bug.png') no-repeat");
    }

    bug.css({'width':imgBugWidth*scaleCof+'px', 'height':imgBugHeight*scaleCof+'px', 'backgroundSize':'cover'});
}
