var Apple = function(cssClass)
{
    this.cssClass = cssClass;
    this.state = 'Tree';
    this.time = 0;
    this.appleDom = '';
    this.scaleCof = $('#gameBug').height()/514;
    this.posXright = '';
    this.posXleft = '';
    this.heightY ='';

    var self = this,
        curPosTop;

    this.init = function (){
        createApple();
    }
    createApple = function(){
        var cssClass = ["redApple", "greenApple", "yellowApple"];
        self.appleDom = $('<div class="apple"></div>');
        self.appleDom.addClass(self.cssClass);
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

        self.appleDom.css({"visibility": "visible",'-webkit-transition-duration': '4s','top':(curPosTop+self.scaleCof*277)+'px'});


    }

    this.appleExpire = function(){
        var tempApple;
        setTimeout(function(){
            self.appleDom.css({"background": 'url("img/purple_red.png")'});
        }, 1000);

        setTimeout(function(){
            tempApple = globalAppleOnGround.pop();
            globalGeneratedApple.push(tempApple);
            self.appleDom.css({'top':'300px',"visibility": "hidden","background" : ""});
            self.state= 'tree'; //again on tree
            self.time= 0;
            self.appleDom.unbind("webkitTransitionEnd");
        }, 3000);// return apple to the tree
    }



    this.init();
}