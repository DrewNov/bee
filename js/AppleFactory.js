// Author: Shazia

//create global array
window.globalGeneratedApple = new Array();
window.globalFlyingApple = new Array();
window.globalAppleOnGround = new Array();

//end of globals var

$(document).ready(

    function(){
        // Initialize CSSClass Array
        for (var i=0; i<30; i++)
        {
            // Generate random apple (Green, Red, Yellow)
            globalGeneratedApple.push(new Apple(i));

        }
        console.log(window.globalGeneratedApple);
        // Grab an Apple for animation, and let it go!
        setInterval(function(){
            console.log(globalGeneratedApple, globalFlyingApple, globalAppleOnGround);
            var appleInFall = globalGeneratedApple.shift();
            //console.log('first element'+ globalGeneratedApple.slice(0,1)) ;
            globalFlyingApple.push(appleInFall);
            //console.log('transition - start');
            appleInFall.animateApple();
            $('#apple-'+appleInFall.appleId).bind("webkitTransitionEnd",function(){
                console.log('transition - end')
                appleInFall.state = 'Ground';
                if(globalFlyingApple.length>0)
                {
                    globalAppleOnGround.push(globalFlyingApple.shift());
                }
                appleInFall.appleExpire();
            });

        },2000)

    }
);
