
$(document).ready(

    function(){
        // Initialize CSSClass Array
        var cssClass = ["redApple", "greenApple", "yellowApple"];

        // Initialize the AppleFactory with 30 Apples
        var appleFactory = new Array();

        for (var i = 0; i < 30; i++)
        {
            // Generate random apple (Green, Red, Yellow)
            appleFactory[i] = new Apple(cssClass[$.random(2)]);
        }

        // Grab an Apple for animation, and let it go!
        setTimeout(function(){
            var appleInFall = appleFactory.shift();

            appleInFall.animate({'top':'+=400'}, 400, function(){
                // Fix fallen apple attributes
                appleInFall.state = 'Ground';

                // Add the fallen apple to groundedApple's array
                apple_ground.push(appleInFall);
                expireApple();
            });
        },2000)



        var apple_ground = new Array();//new array of apples,which are on the ground

        function expire_apple(){ // apples are coming to the tree again
            apple_ground.each(function() {

                setTimeout(function(){
                    // this = (100,100, 'purple','Tree',0);
                    this.state= 'tree'; //again on tree
                    this.time= 0;  // clear time
                    appleFactory.push(this)}, 2000);// return apple to the tree

            });
        }


    }
);