
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

    }

    // On Load Start Falling Apples

    //
);