
//Author: Shazia

var Apple = function(cssClass)
{
    this.cssClass = cssClass;
    this.state = 'Tree';
    this.time = 0;
    this.appleDom = '';

    self = this;

    this.init = function (){
        self.appleDom = $('<div class ="yabloko"></div>');
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

        for (var i = 0; i < 30; i++)
        {
            // Generate random apple (Green, Red, Yellow)
            appleFactory[i] = new Apple(cssClass[0]);
        }

        // Grab an Apple for animation, and let it go!
        setInterval(function(){
            var appleInFall = appleFactory.shift();

            appleInFall.appleDom.animate({'top':'+=400'}, 4000, function(){
                // Fix fallen apple attributes
                appleInFall.state = 'Ground';

                // Add the fallen apple to groundedApple's array
                apple_ground.push(appleInFall);
                expireApple();
            });
        },2000)

        //Author: Genia
        var apple_ground = new Array();//new array of apples,which are on the ground

        function expireApple(){ // apples are coming to the tree again
            $.each(apple_ground,function() {

                setTimeout(function(){
                    // this = (100,100, 'purple','Tree',0);
                    this.state= 'tree'; //again on tree
                    this.time= 0;  // clear time
                    console.log(apple_ground)
                   // appleFactory.push(apple_ground.splice((apple_ground.length)-1,1));
                    appleFactory.push(apple_ground.splice((apple_ground.length),1));
                    // appleFactory.push(apple_ground.splice(-1,1));


                }, 2000);// return apple to the tree

            });
        }
    }
);