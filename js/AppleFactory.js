// Author: Shazia

//create global array
window.globalGeneratedApple = new Array();
window.globalFlyingApple = new Array();
window.globalAppleOnGround = new Array();

//end of globals var

$(document).ready(

    function(){
        // Initialize CSSClass Array
        for (var i=0; i<10; i++)
        {
            // Generate random apple (Green, Red, Yellow)
            globalGeneratedApple.push(new Apple(i));

        }
        //console.log(window.globalGeneratedApple);
        // Grab an Apple for animation, and let it go!
        setInterval(function(){
            //console.log(globalGeneratedApple, globalFlyingApple, globalAppleOnGround);
            var appleInFall = globalGeneratedApple.shift();
            globalFlyingApple.push(appleInFall);
            appleInFall.animateApple();
            $('#apple-'+appleInFall.appleId).bind("webkitTransitionEnd",function(){
                console.log('add apple to ground');
                appleInFall.state = 'Ground';
                globalAppleOnGround.push(globalFlyingApple.shift());
                appleInFall.appleExpire();
            });

        },2000)

    }
);
