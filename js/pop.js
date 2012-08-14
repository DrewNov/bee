/**
 * Created with JetBrains WebStorm.
 * User: volt
 * Date: 14.08.12
 * Time: 21:28
 * To change this template use File | Settings | File Templates.
 */

var popup = function(){

    this.height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    this.width =  (window.innerWidth > 0) ? window.innerWidth : screen.width;
    this.popDiv = $('<div class="pop-bg"></div>');
    this.boxDiv = $('<div class="box-pop"></div>');
    var boxHeight = this.height/2,
        boxWidth = this.width/2,
        boxTop = (this.height-boxHeight)/2,
        boxLeft = (this.width-boxWidth)/2,
        self = this;

    this.show = function(id){
        self.popDiv.css({'width':self.width+'px','height':self.height+'px'});
        self.boxDiv.css({'width':boxWidth+'px','height':boxHeight+'px','top':boxTop+'px','left':boxLeft+'px'});
        self.boxDiv.html($('#'+id).html());
        self.popDiv.append(self.boxDiv);
        $('body').append(self.popDiv);
    }
    this.remove = function(){
        self.popDiv.remove();
    }
}