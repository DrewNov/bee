
var bug = function(setings)
{
    this.param = setings;
    this.speed = 1;
    this.weight = 150;
    this.life = 3;
    this.gameBlock = $('#'+this.param.idGameBlock);
    this.scaleCof = this.gameBlock.height()/514  ;
    this.bugDom = '' ;
    this.posBottomTopY = '' ;
    this.posBottomY = '' ;
    this.bugWidth = '';
    var self = this,
        gameBlockWidth = this.gameBlock.width();

    this.init = function()
    {
        prepareBug();
        addStatusBar();
        decreaseWeight();
        self.posBottomTopY = parseInt(self.bugDom.css('bottom'))+49*self.scaleCof;
        self.posBottomY = parseInt(self.bugDom.css('bottom'));
        bugCheckColision();

    }
    var decreaseWeight = function () {
        setInterval(function(){
           // console.log(self.weight);
            --self.weight;
//            console.log(self.weight);
        },1000);

    }
    this.addWeight = function (bonus) {
        self.weight = self.weight+bonus;
    }

    this.removeLife = function () {
        --self.life;
        if (self.life > 0)
        {
            return true;
        }
        else
        {
            return false;
        }

    }
    var prepareBug = function (){
        var bugDiv = $('<div class="bug" id="bug"></div>'),
            imgBugHeight = 49,
            imgBugWidth = 61,
            bottom = 29;

        $(bugDiv).css({'width':imgBugWidth*self.scaleCof+'px','height':imgBugHeight*self.scaleCof+'px', 'bottom':bottom*self.scaleCof+'px','right':'100px','backgroundSize':'cover'});
        console.log('bug add to game block');
        self.bugWidth = parseInt(bugDiv.height());
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
        var halfWidth = window.screen.width/ 2,
            pixelPerMs = 0.5,
            time,
            curPos = self.bugDom.position().left;
            if (e.screenX < halfWidth && curPos >= 0)
            {
                time = curPos/pixelPerMs;
                self.bugDom.css({'-webkit-transition-duration': time+'ms','left':'1px'});
                console.log('left', time, curPos, halfWidth, e.screenX);
            }
            else if (e.screenX >= halfWidth && gameBlockWidth >= curPos)
            {

                time = (gameBlockWidth-curPos)/pixelPerMs;
                console.log('right', time);
                self.bugDom.css({'-webkit-transition-duration': time+'ms','left':(gameBlockWidth)+'px'});

            }
            else{
                return false
            }

    }
    this.bugStopMove = function (){
        curPos = self.bugDom.position().left;
        self.bugDom.css({'-webkit-transition-duration': '0s', 'left':curPos+'px'});
    }

    var bugCheckColision = function(){

        setInterval(function(){
            var bugPosLeft =  self.bugDom.position().left;
            if (globalFlyingApple.length>0)
            {
                $.each(globalFlyingApple,function(){
                    if((self.posBottomY <= this.appleDom.position().top+this.heightY <= self.posBottomTopY &&
                        bugPosLeft <= this.posXright >= bugPosLeft+self.bugWidth) ||
                        (self.posBottomY <= this.appleDom.position().top+this.heightY <= self.posBottomTopY &&
                            bugPosLeft <= this.posXleft >= bugPosLeft+self.bugWidth)
                        )
                    {
                        console.log('colisoin!!!!!!!!!!!')

                    }
                });
            }
        },0);
    }

    this.init();
}
