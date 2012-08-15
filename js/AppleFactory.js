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
/*        setInterval(function(){
            var appleInFall = globalGeneratedApple.shift();
            globalFlyingApple.push(appleInFall);
            appleInFall.animateApple();
            $('#apple-'+appleInFall.appleId).bind("webkitTransitionEnd",function(){
                appleInFall.state = 'Ground';
                globalAppleOnGround.push(globalFlyingApple.shift());
                appleInFall.appleExpire();
            });

        },2000)*/
        globalVi = setVariableInterval(function() {
            var interval = this.interval,
                appleInFall = globalGeneratedApple.shift();
            globalFlyingApple.push(appleInFall);
            appleInFall.animateApple();
            $('#apple-'+appleInFall.appleId).bind("webkitTransitionEnd",function(){
                appleInFall.state = 'Ground';
                globalAppleOnGround.push(globalFlyingApple.shift());
                appleInFall.appleExpire();
            });
            return globalTime;
        }, 2000);

    }
);

window.setVariableInterval = function(callbackFunc, timing) {
    var variableInterval = {
        interval: timing,
        callback: callbackFunc,
        stopped: false,
        runLoop: function() {
            if (variableInterval.stopped) return;
            var result = variableInterval.callback.call(variableInterval);
            if (typeof result == 'number')
            {
                if (result === 0) return;
                variableInterval.interval = result;
            }
            variableInterval.loop();
        },
        stop: function() {
            this.stopped = true;
            window.clearTimeout(this.timeout);
        },
        start: function() {
            this.stopped = false;
            return this.loop();
        },
        loop: function() {
            this.timeout = window.setTimeout(this.runLoop, this.interval);
            return this;
        }
    };

    return variableInterval.start();
};
