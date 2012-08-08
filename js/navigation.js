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
    } else {
        console.log('Right');
        if (bugX >= halfWidth*2-45) {
            return false;
        }
        bugX += step;
    }

    bug.css("left", bugX + "px");
}
