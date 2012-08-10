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
            globalGeneratedApple[i] = new Apple();

        }

        // Grab an Apple for animation, and let it go!
        setInterval(function(){
            var appleInFall = globalGeneratedApple.splice(0,1)[0];
            globalFlyingApple.push(appleInFall);
            console.log('flyapple add '+ globalFlyingApple.length);
            appleInFall.appleDom.bind("webkitTransitionEnd",function(){
                appleInFall.state = 'Ground';
                globalFlyingApple.pop() ;
                console.log('flyapple remove '+ globalFlyingApple.length);
                globalAppleOnGround.push(appleInFall);
                //console.log('ground apple add '+ globalAppleOnGround);
                appleInFall.appleExpire();
            });
            appleInFall.animateApple();
            //appleInFall.appleDom.css({"visibility": "visible"});

            //appleInFall.appleDom.animate({'top':'+='+appleInFall.scaleCof*277}, 4000, function(){
                // Fix fallen apple attributes
                //appleInFall.state = 'Ground';

                // Add the fallen apple to groundedApple's array

                //console.log(appleInFall);
                //apple_ground.push(appleInFall);
                // console.log(apple_ground);
              //  expireApple(appleInFall);
            //});
        },2000)

    }
);
