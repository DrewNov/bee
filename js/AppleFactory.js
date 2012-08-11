//Author: Shazia

var Apple = function(cssClass)
{
    this.cssClass = cssClass;
    this.state = 'Tree';
    this.time = 0;
    this.appleDom = '';
    this.scaleCof = $('#gameBug').height()/514;

    self = this;

    this.init = function (){
        this.createApple();
    }
    this.createApple = function(){
        self.appleDom = $('<div class="apple"></div>');
        self.appleDom.addClass(self.cssClass);
        self.appleDom.css({
            "left": Math.floor((Math.random()*(410*self.scaleCof))+self.scaleCof*179),
            "top":self.scaleCof*212+"px" ,
            'width':self.scaleCof*20+'px' ,
            'height':self.scaleCof*21+'px'
        });
        $('.game').append(self.appleDom);

    }

    this.animateApple = function (){

        self.appleDom.css({"visibility": "visible"});


    }



    this.init();
}

// Author: Shazia

$(document).ready(

    function(){
        // Initialize CSSClass Array
        var cssClass = ["redApple", "greenApple", "yellowApple"];

        // Initialize the AppleFactory with 30 Apples
        var appleFactory = new Array();

        for (var i=0; i<30; i++)
        {
            // Generate random apple (Green, Red, Yellow)
            appleFactory[i] = new Apple(cssClass[Math.floor(Math.random() * (3))]);

        }

        // Grab an Apple for animation, and let it go!
        setInterval(function(){
            var appleInFall = appleFactory.shift();

            appleInFall.appleDom.css({"visibility": "visible"});

            appleInFall.appleDom.animate({'top':'+='+appleInFall.scaleCof*277}, 4000, function(){
                // Fix fallen apple attributes
                appleInFall.state = 'Ground';

                // Add the fallen apple to groundedApple's array

                //console.log(appleInFall);
                //apple_ground.push(appleInFall);
                // console.log(apple_ground);
                expireApple(appleInFall);
            });
        },2000)

        //Author: Genia
        var apple_ground = new Array();//new array of apples,which are on the ground

        function expireApple(fallApple){ // apples are coming to the tree again
            apple_ground.push(fallApple);
            apple_ground.reverse();
            var lastApple = apple_ground.splice(0,1);

            setTimeout(function(){
                lastApple[0].appleDom.css({"background": "#db7093"});
            }, 1000);

            setTimeout(function(){
                $(lastApple[0].appleDom).css({'top':'300px'});
                lastApple[0].appleDom.css({
                    "background" : ""
                });
                lastApple[0].state= 'tree'; //again on tree
                lastApple[0].time= 0;  // clear time
                lastApple[0].appleDom.css({"visibility": "hidden"});
            }, 3000);// return apple to the tree

            appleFactory.push(lastApple[0]);
            apple_ground.reverse();
        }
    }
);
