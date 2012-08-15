
var bug = function(setings)
{
    this.param = setings;
    this.trans = 'translate3d(0,0,0)';
    this.halfWidth = window.screen.width/ 2;
    this.pixelPerMs = 0.5;
    this.weight = 100;
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
    this.toNextLevel = 5;
    this.gamePop = new popup();
    var self = this,
        gameBlockWidth = this.gameBlock.width(),
        gameBlockHeight = this.gameBlock.height();

    this.init = function(){
        prepareBug();
        addStatusBar();
        decreaseWeight();
        self.posBottomTopY = this.gameBlock.height() - parseInt(self.bugDom.css('bottom')) - 49*self.scaleCof;
        self.posBottomY = this.gameBlock.height() - parseInt(self.bugDom.css('bottom'));
        bugCheckColision();
        addBugInfo();

    }

    var decreaseWeight = function () {
        setInterval(function(){
            self.weight = self.weight-((2*self.level)+1);
            if (self.weight >= 100 ) {
                self.pixelPerMs = 0.5 - ((self.weight-100)*0.005);
            }
            else{
                self.pixelPerMs = 0.5;
            }
        },1000);
    }

    this.addWeight = function (bonus) {
        self.weight += bonus;
    }

    this.increaseLevel = function () {
        ++self.level;
        ++self.life;
        $('.life span').html(self.life);
        $('.level span').html(self.level);
        $('.nextLevel span').html(self.level);
        $('.nextLevel').bind('webkitTransitionEnd',function(){
            $('.nextLevel').css({'opacity':0});
            $(this).unbind('webkitTransitionEnd');
        });
        $('.nextLevel').css({'opacity':1});
        self.toNextLevel = self.toNextLevel +self.level*5;
        globalTime = 2000 - self.level*200;
    }

    this.increaseEaten = function () {
        ++self.eaten;
        $('.eaten span').html(self.eaten);
        if(self.eaten == self.toNextLevel)
        {
            self.increaseLevel();
        }
    }

    this.removeLife = function () {
        --self.life;
        $('.life span').html(self.life);
        if (self.life == 0) {
            $('body').unbind("vmousedown");
            $('a').bind("vmousedown",function(){
                e.preventDefault();
                console.log('1');
            });
            self.gamePop.show('pop-end');
        }
    }

    var prepareBug = function (){
        var bugDiv = $('<div class="bug" id="bug"></div>'),
            imgBugHeight = 49,
            imgBugWidth = 61,
            bottom = 29;

        $(bugDiv).css({'width':Math.round(imgBugWidth*self.scaleCof)+'px','height':Math.round(imgBugHeight*self.scaleCof)+'px', 'bottom':Math.round(bottom*self.scaleCof)+'px','right':'100px','backgroundSize':'cover'});
        self.bugWidth = bugDiv.width();
        self.bugHeight = bugDiv.height();
        self.gameBlock.append(bugDiv) ;
        self.bugDom = bugDiv;

    }

    var addStatusBar = function (){
        var barBlock = $('<div class="mainBar"></div>'),
            subBarNormalBlock = $('<div class="subBarNormal"></div>'),
            subBarOverEatBlock = $('<div class="subBarOverEat"></div>'),
            normalIndicator = $('<div class="indicator"></div>'),
            overIndicator = $('<div class="indicator"></div>'),
            barWidth = 200,
            barHeight = 14;

        barBlock.css({'width':self.scaleCof*barWidth+'px','height':self.scaleCof*barHeight+'px','top':self.scaleCof*15+'px','left':self.scaleCof*115+'px'});
        subBarNormalBlock.append(normalIndicator);
        subBarOverEatBlock.append(overIndicator);
        barBlock.append(subBarNormalBlock);
        barBlock.append(subBarOverEatBlock);
        self.gameBlock.append(barBlock);

        setInterval(function(){
            var scaleWeight = self.weight*self.scaleCof;

            if(subBarNormalBlock.width() > scaleWeight  && scaleWeight > 0)
            {
                normalIndicator.css({'width':scaleWeight+'px', 'height':'100%','backgroundColor':'#73d216'});
                overIndicator.css({'width':'0px' ,'height':'100%','backgroundColor':'#ffcc00'});
                // console.log('start animate normal status bar current width'+subBarNormalBlock.width()) ;
            }
            else if ((self.scaleCof*barWidth) <= scaleWeight || scaleWeight <= 0)
            {
                self.removeLife();
                self.weight = 100;
                normalIndicator.css({'width':'100%', 'height':'100%','backgroundColor':'#73d216'});
                overIndicator.css({'width':'0px','height':'100%','backgroundColor':'#ffcc00'});
            }
            else
            {
                normalIndicator.css({'width':'100%', 'height':'100%','backgroundColor':'#73d216'});
                overIndicator.css({'width':(scaleWeight - subBarNormalBlock.width())+'px','height':'100%','backgroundColor':'#ffcc00'});
                // console.log('start animate over status bar current width'+(self.weight*self.scaleCof - subBarNormalBlock.width())+'px') ;
            }
        },1000);
    }

    var addBugInfo = function() {
        var mainTab = $('.playerInfo'),
            tabImg = $('.playerInfo img');
        mainTab.css({'top':(self.scaleCof*55)+'px','left':(self.scaleCof*20)+'px'});
        tabImg.css({'height':(mainTab.find('li').height()*0.6)+'px',width:'auto'});
        self.gameBlock.append();
    }

    this.bugMove = function (e){
        var time,
            curPos = Math.round(self.bugDom.position().left);

        if ((e.screenX < self.halfWidth && curPos >= 0))
        {
            time = Math.round(curPos/self.pixelPerMs);
            self.bugDom.css({'-webkit-transform':self.trans+' scaleX(1)','-webkit-transition-duration': time+'ms','left':'1px'});
        }
        else if (e.screenX >= self.halfWidth && curPos <= gameBlockWidth - self.bugWidth)
        {
            time = Math.round((gameBlockWidth - self.bugWidth-curPos)/self.pixelPerMs);
            self.bugDom.css({'-webkit-transform':self.trans+' scaleX(-1)','-webkit-transition-duration': time+'ms','left':(gameBlockWidth - self.bugWidth)+'px'});
        }
    }
    this.bugStopMove = function (){
        var curPos = Math.round(self.bugDom.position().left);
        self.bugDom.css({'-webkit-transition-duration': '0s', 'left':curPos+'px'});
    }

    var bugCheckColision = function(){
        setInterval(function(){
            if (globalFlyingApple.length>0) {
                var bugLeftX =  Math.round(self.bugDom.position().left),
                    bugRightX = bugLeftX + self.bugWidth;

                for (var i = 0; i < globalFlyingApple.length; i++) {
                    var apple = globalFlyingApple[i],
                        appleY = Math.round(apple.appleDom.position().top) + apple.heightY;

                    if (appleY >= self.posBottomTopY) {
                        if (apple.nearBug == false){
                            if (bugRightX >= apple.posXleft && bugLeftX <= apple.posXright){
                                globalGeneratedApple.push(globalFlyingApple.splice(i,1)[0]);
                                if (i != globalFlyingApple.length) {i = i - 1}
                                $('#apple-'+apple.appleId).unbind("webkitTransitionEnd");
                                apple.appleMeetBug(false,apple.posXleft,100);
                                self.removeLife();
                            }
                        } else {
                            if (bugRightX >= apple.posXleft && bugLeftX <= apple.posXright){
                                globalGeneratedApple.push(globalFlyingApple.splice(i,1)[0]);
                                if (i != globalFlyingApple.length) {i = i - 1}
                                $('#apple-'+apple.appleId).unbind("webkitTransitionEnd");
                                apple.appleMeetBug(true,apple.posXleft,100);
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

            if (globalAppleOnGround.length > 0) {
                for (var j = 0; j < globalAppleOnGround.length; j++) {
                    var appleOnGround = globalAppleOnGround[j];

                    if (bugRightX >= appleOnGround.posXleft && bugLeftX <= appleOnGround.posXright){
                        globalGeneratedApple.push(globalAppleOnGround.splice(j,1)[0]);
                        console.log(appleOnGround.state);
                        if (appleOnGround.state == 'bad') {
                            appleOnGround.appleMeetBug(false,appleOnGround.posXleft,100);
                            self.removeLife();
                            appleOnGround.timerOn = false;
                        } else {
                            appleOnGround.appleMeetBug(true,appleOnGround.posXleft,100);
                            self.increaseEaten();
                            self.addWeight(10);
                            appleOnGround.timerOn = false;
                        }
                    }
                }
            }
        },0);
    }

    this.init();
}
