
//Author: Shazia

var Apple = function(cssClass)
{
    this.cssClass = cssClass;
    this.state = 'Tree';
    this.time = 0;
    this.appleDom = '';

    self = this;

    this.init = function (){
        self.appleDom = $('<div class="apple"></div>');
        self.appleDom.addClass(self.cssClass);
        $('.game').append(self.appleDom);
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
            appleFactory[i].appleDom.css({
                "left": Math.floor(Math.random() * (501)) + 350
            });
        }

        // Grab an Apple for animation, and let it go!
        setInterval(function(){
            var appleInFall = appleFactory.shift();

            appleInFall.appleDom.animate({'top':'+=400'}, 4000, function(){
                // Fix fallen apple attributes
                appleInFall.state = 'Ground';

                // Add the fallen apple to groundedApple's array

                //console.log(appleInFall);
                apple_ground.push(appleInFall);
               // console.log(apple_ground);
                expireApple();
            });
        },2000)

        //Author: Genia
        var apple_ground = new Array();//new array of apples,which are on the ground

        function expireApple(){ // apples are coming to the tree again
           // $.each(apple_ground,function() {

                setTimeout(function(){

                    apple_ground.reverse();
                    var lastApple = apple_ground.splice(0,1);
                    console.log(lastApple[0]);
                    $(lastApple[0].appleDom).css({'top':'100px'});
                    lastApple[0].state= 'tree'; //again on tree
                    lastApple[0].time= 0;  // clear time
                    console.log(apple_ground);
                    appleFactory.push(lastApple[0]);
                    apple_ground.reverse();

                }, 2000);// return apple to the tree

            //});
        }
    }
);