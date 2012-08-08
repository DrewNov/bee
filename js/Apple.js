/**
 * Created with JetBrains WebStorm.
 * User: shaz
 * Date: 6.08.12
 * Time: 15:43
 * To change this template use File | Settings | File Templates.
 */

var apple = function(setings)
{
    this.param = setings;

    var posX = 100,
        posY = 100,
        color = setings.color,
        image = '',
        state = 'Tree',
        time = 0;

        self = this;

    this.init = function (){
        appleDom = $(<div></div>);
        appleDom.addClass(self.param.classApple);
        $('.game').append(appleDom);
    }

    this.init();
}