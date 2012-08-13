
var bug = function(setings)
{
    this.param = setings;
    this.halfWidth = window.screen.width/ 2;
    this.pixelPerMs = 0.5;
    this.weight = 150;
    this.eaten = 0;
    this.life = 3;
    this.level = 1;
    this.gameBlock = $('#'+this.param.idGameBlock);
    this.scaleCof = this.gameBlock.height()/514  ;
    this.bugDom = '' ;
    this.posBottomTopY = '' ;
    this.posBottomY = '' ;
    this.bugWidth = '';
    this.bugHeight = '';
    var self = this;
    var gameBlockWidth = this.gameBlock.width();
    var gameBlockHeight = this.gameBlock.height();

    this.init = function(){
        prepareBug();
        addStatusBar();
        decreaseWeight();
        self.posBottomTopY = this.gameBlock.height() - parseInt(self.bugDom.css('bottom')) - 49*self.scaleCof;
        self.posBottomY = this.gameBlock.height() - parseInt(self.bugDom.css('bottom'));
        bugCheckColision();
    }

    var decreaseWeight = function () {
        setInterval(function(){
            //console.log(self.weight);
            --self.weight;
            //console.log(self.weight);
        },1000);
    }

    this.addWeight = function (bonus) {
        self.weight += bonus;
        if (self.pixelPerMs >= 0.05) {
            self.pixelPerMs -= 0.03;
        }
        console.log('Speed: ' + self.pixelPerMs);
    }

    this.increaseLevel = function () {
        ++self.level;
        $('#level').html('Level: ' + self.level);

        if (self.level == 3) {
            alert('Winner!!!');
            return true;
        } else {
            return false;
        }
    }

    this.increaseEaten = function () {
        ++self.eaten;
        $('#eaten').html('Eaten: ' + self.eaten);

        if (self.eaten == 5) {
            alert('Level 2 !');
            self.increaseLevel();
            return true;
        } else {
            return false;
        }
    }

    this.removeLife = function () {
        --self.life;
        $('#lifes').html('Lifes: ' + self.life);

        if (self.life > 0) {
            return true;
        } else {
            alert('Game over...');
            return false;
        }
    }

    var prepareBug = function (){
        var bugDiv = $('<div class="bug" id="bug"></div>');
        var imgBugHeight = 49;
        var imgBugWidth = 61;
        var bottom = 29;

        $(bugDiv).css({'width':imgBugWidth*self.scaleCof+'px','height':imgBugHeight*self.scaleCof+'px', 'bottom':bottom*self.scaleCof+'px','right':'100px','backgroundSize':'cover'});
        self.bugWidth = bugDiv.width();
        self.bugHeight = bugDiv.height();
        self.gameBlock.append(bugDiv) ;
        self.bugDom = bugDiv;

    }

    var addStatusBar = function (){
        var barBlock = $('<div class="mainBar"></div>');
        var subBarNormalBlock = $('<div class="subBarNormal"></div>');
        var subBarOverEatBlock = $('<div class="subBarOverEat"></div>');
        var normalIndicator = $('<div class="indicator"></div>');
        var overIndicator = $('<div class="indicator"></div>');
        var barWidth = 200;
        var barHeight = 14;

        barBlock.css({'width':self.scaleCof*barWidth+'px','height':self.scaleCof*barHeight+'px'});
        subBarNormalBlock.append(normalIndicator);
        subBarOverEatBlock.append(overIndicator);
        barBlock.append(subBarNormalBlock);
        barBlock.append(subBarOverEatBlock);
        self.gameBlock.append(barBlock);

        setInterval(function(){
            if(subBarNormalBlock.width() > self.weight*self.scaleCof )
            {
                normalIndicator.css({'width':self.weight*self.scaleCof+'px', 'height':'100%','backgroundColor':'#73d216'});
                overIndicator.css({'width':'0px' ,'height':'100%','backgroundColor':'#ffcc00'});
                // console.log('start animate normal status bar current width'+subBarNormalBlock.width()) ;
            }
            else
            {
                normalIndicator.css({'width':'100%', 'height':'100%','backgroundColor':'#73d216'});
                overIndicator.css({'width':(self.weight*self.scaleCof - subBarNormalBlock.width())+'px','height':'100%','backgroundColor':'#ffcc00'});
                // console.log('start animate over status bar current width'+(self.weight*self.scaleCof - subBarNormalBlock.width())+'px') ;
            }
        },1000);
    }

    this.bugMove = function (e){
        var time;
        var curPos = Math.round(self.bugDom.position().left);

        if ((e.screenX < self.halfWidth && curPos >= 0))
        {
            time = curPos/self.pixelPerMs;
            self.bugDom.css({'-webkit-transform':'scaleX(1)','-webkit-transition-duration': time+'ms','left':'1px'});
            //self.bugDom.css({'background-image':'url(img/bug.png)','-webkit-transition-duration': time+'ms','left':'1px'});
        }
        else if (e.screenX >= self.halfWidth && curPos <= gameBlockWidth - self.bugWidth)
        {
            time = (gameBlockWidth - self.bugWidth-curPos)/self.pixelPerMs;
            self.bugDom.css({'-webkit-transform':'scaleX(-1)','-webkit-transition-duration': time+'ms','left':(gameBlockWidth - self.bugWidth)+'px'});
            //self.bugDom.css({'background-image':'url(img/bug_inv.png)','-webkit-transition-duration': time+'ms','left':(gameBlockWidth - self.bugWidth)+'px'});
        }
    }

    this.bugMoveAcc = function (e){
        var pixelPerMs = 0.2, // add to bog param
            time,
            curPos = Math.round(self.bugDom.position().left);
        if ((e.accY > 20 && curPos >= 0))
        {
            time = curPos/pixelPerMs;
            self.bugDom.css({'-webkit-transition-duration': time+'ms','left':'1px','background-image':'url(img/bug.png)'});
            console.log('left', time, curPos, halfWidth, e.screenX);
        }
        else if ((e.accY < 0 && gameBlockWidth >= curPos))
        {
            time = (gameBlockWidth-curPos)/pixelPerMs;
            console.log('right', time);
            self.bugDom.css({'-webkit-transition-duration': time+'ms','left':(gameBlockWidth)+'px','background-image':'url(img/bug_inv.png)'});
        }
    }

    this.bugStopMove = function (){
        var curPos = Math.round(self.bugDom.position().left);
        self.bugDom.css({'-webkit-transition-duration': '0s', 'left':curPos+'px'});
    }

    var bugCheckColision = function(){
        setInterval(function(){
            if (globalFlyingApple.length>0) {
                var bugLeftX =  Math.round(self.bugDom.position().left);
                var bugRightX = bugLeftX + self.bugWidth;

                //$.each(globalFlyingApple,function(index, apple){
                for (i = 0; i < globalFlyingApple.length; i++) {
                    var apple = globalFlyingApple[i];
                    var appleY = Math.round(apple.appleDom.position().top) + apple.heightY;

                    if (appleY >= self.posBottomTopY) {
                        if (apple.nearBug == false){
                            if (bugRightX >= apple.posXleft && bugLeftX <= apple.posXright){
                                $('#test2').html('KILL on X=' + apple.posXleft);   //KILL
                                console.log('KILL');
                                globalGeneratedApple.push(globalFlyingApple.splice(i,1)[0]);
                                if (i != globalFlyingApple.length - 1) {i = i - 1}
                                $('#apple-'+apple.appleId).unbind("webkitTransitionEnd");
                                apple.appleMeetBug(true);
                                self.removeLife();
                            }
                        } else {
                            if (bugRightX >= apple.posXleft && bugLeftX <= apple.posXright){
                                $('#test3').html('CATCH on X=' + apple.posXleft);   //CATCH
                                console.log('CATCH');
                                globalGeneratedApple.push(globalFlyingApple.splice(i,1)[0]);
                                if (i != globalFlyingApple.length - 1) {i = i - 1}
                                $('#apple-'+apple.appleId).unbind("webkitTransitionEnd");
                                apple.appleMeetBug(true);
                                self.increaseEaten();
                                self.addWeight(10);
                            }
                        }
                        apple.nearBug = true;
                    } else {
                        apple.nearBug = false;
                    }
                }
            }
        },0);
    }

    this.init();
}
