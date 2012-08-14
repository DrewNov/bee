var Apple = function(iteration)
{
    this.appleId = iteration;
    this.state = 'Tree';
    this.time = 0;
    this.appleDom = '';
    this.scaleCof = ($('#gameBug').height()/514).toFixed(2);
    this.posXright = '';
    this.posXleft = '';
    this.heightY ='';
    this.nearBug = false;
    this.timerOn = true;

    var self = this,
        curPosTop;

    this.init = function (){
        createApple();
    }
    createApple = function(){
        var cssClass = ["redApple", "greenApple", "yellowApple"];
        self.appleDom = $('<div class="apple" id="apple-'+self.appleId+'"></div>');
        self.appleDom.addClass(cssClass[Math.floor(Math.random() * (3))]);
        self.appleDom.css({
            "left": Math.floor((Math.random()*(410*self.scaleCof))+self.scaleCof*179),
            "top":self.scaleCof*212+"px" ,
            'width':self.scaleCof*20+'px' ,
            'height':self.scaleCof*21+'px'
        });
        curPosTop = parseInt(self.appleDom.css('top'));
        self.posXright = parseInt(self.appleDom.css('left'))+self.scaleCof*20;
        self.posXleft = parseInt(self.appleDom.css('left'));
        self.heightY = self.scaleCof*21;
        $('.game').append(self.appleDom);

    }

    this.animateApple = function (){
        self.appleDom.css({"visibility": "visible",'-webkit-transition-duration': '4s','top':(curPosTop+self.scaleCof*260)+'px'});
    }

    this.appleExpire = function(){
        //console.log(globalAppleOnGround);
        setTimeout(function(){
            self.appleDom.css({"background": 'url("img/purple_orange.png")',"background-size" : 'cover'});
            self.state = 'bad';
        }, 1000);

        setTimeout(function(){
            if (self.timerOn)
            {
                if(globalAppleOnGround.length>0)
                {
                    globalGeneratedApple.push(globalAppleOnGround.shift());
                }
                self.appleDom.css({'top':(self.scaleCof*212)+'px','-webkit-transition-duration': '0s',"visibility": "hidden","background" : ""});
                self.state= 'tree'; //again on tree
                self.time= 0;
                $('#apple-'+self.appleId).unbind("webkitTransitionEnd");
            }
            self.timerOn = true;
        }, 3000);// return apple to the tree
    }
    this.appleMeetBug = function(action,x, y) {
        var msg = '+1 apple',
            color = 'green';
        if (!action){

            var msg = '-1 life',
                color = 'red'
        }
        var showMsg = $('<div class="msg" id="msg-'+x+'" >'+msg+'</div>');
        showMsg.css({'left':x+'px','bottom':(70*self.scaleCof)+'px','color':color});
        $('#gameBug').append(showMsg);
        $('#msg-'+x).bind('webkitTransitionEnd',function(){
            $(this).remove();
        });
        setTimeout(function(){
            showMsg.css({'bottom':((50*self.scaleCof)+y)+'px'});
        },0);

        self.appleDom.css({'top':(self.scaleCof*212)+'px','-webkit-transition-duration': '0s',"visibility": "hidden","background" : ""});

    }

    this.init();
}