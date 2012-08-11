// Author: Shazia

//create global array
globalGeneratedApple = new Array();
globalFlyingApple = new Array();
globalAppleOnGround = new Array();

//end of globals var

$(document).ready(

    function(){
        // Initialize CSSClass Array
        for (var i=0; i<30; i++)
        {
            // Generate random apple (Green, Red, Yellow)
            globalGeneratedApple[i] = new Apple(i);

        }

        // Grab an Apple for animation, and let it go!
        setInterval(function(){
            var appleInFall = globalGeneratedApple.shift();
            globalFlyingApple.push(appleInFall);
            appleInFall.state = 'fly';
            appleInFall.animateApple();
            appleInFall.appleDom.bind("webkitTransitionEnd",function(){
                appleInFall.state = 'Ground';
                globalAppleOnGround.push( globalFlyingApple.shift() );
                appleInFall.appleExpire();
            });

        },2000)

    }
);
