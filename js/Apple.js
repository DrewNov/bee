/**
 * Created with JetBrains WebStorm.
 * User: shaz
 * Date: 6.08.12
 * Time: 15:43
 * To change this template use File | Settings | File Templates.
 */

var Apple = function(cssClass)
{
        this.cssClass = cssClass;
        this.state = 'Tree';
        this.time = 0;
        self = this;

    this.init = function (){
        appleDom = $(<div></div>);
        appleDom.addClass(self.color.classApple);
        $('.game').append(appleDom);
    }

    this.init();
}