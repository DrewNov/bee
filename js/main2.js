
$(document).ready(

    function(){
        // Initialize the AppleFactory with 30 Apples
        var appleFactory = new Array();

        for (var i = 0; i < 30; i++)
        {
            // Generate Random X, Y, and Color (and of course corresponding image file)
            //var obj = new Apple();                                                                                                      );
            appleFactory.push(obj);
        }

        // Grab an Apple for animation, and let it go!
        for (var i = 0; i < 30; i++)
        {
            var appleInFall = appleFactory.shift();

            appleInFall.animate({'top':'+=400'}, 400, function(){
                // Fix fallen apple attributes
                appleInFall.state = 'Ground';

                // Add the fallen apple to groundedApple's array
                apple_ground.push(appleInFall);
                expireApple();
            });
        }
    }

    // On Load Start Falling Apples

    //
);