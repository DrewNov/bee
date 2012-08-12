
var moveBug = function (e) {
    var curX = e.clientX;
    var bugX = bug.position().left;

    if (curX < halfWidth) {
        console.log('Left');
        if (bugX <= 0) {
            return false;
        }
        if (turn == 1) {
            flipBug(-1);
            turn = -1;
        }
        bugX -= step;
//        bug.animate({left: '-='+step}, time_interval, 'linear');
    } else {
        console.log('Right');
        if (bugX >= stopWidth) {
            return false;
        }
        if (turn == -1) {
            flipBug(1);
            turn = 1;
        }
        bugX += step;
//        bug.animate({left: '+='+step}, time_interval, 'linear');
    }

    bug.css("left", bugX + "px");
}

var flipBug = function (e) {
    if (e == 1) {
        bug.css("background-image", "url('../img/bug_inv.png')");
    } else {
        bug.css("background-image", "url('../img/bug.png')");
    }
}
