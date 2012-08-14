// Author: Shazia

//create global vars
window.globalGeneratedApple = new Array();
window.globalFlyingApple = new Array();
window.globalAppleOnGround = new Array();
window.globalTime = 2000;


//end of globals var

$(document).ready(

    function(){
        // Initialize CSSClass Array
        for (var i=0; i<10; i++)
        {
            globalGeneratedApple.push(new Apple(i));

        }
        setInterval(function(){
            console.log(globalTime);
            var appleInFall = globalGeneratedApple.shift();
            globalFlyingApple.push(appleInFall);
            appleInFall.animateApple();
            $('#apple-'+appleInFall.appleId).bind("webkitTransitionEnd",function(){
                console.log('add apple to ground');
                appleInFall.state = 'Ground';
                globalAppleOnGround.push(globalFlyingApple.shift());
                appleInFall.appleExpire();
            });

        },1500)

    }
);
