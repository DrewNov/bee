/**
 * Created with JetBrains WebStorm.
 * User: ADMIN
 * Date: 08.08.12
 * Time: 11:13
 * To change this template use File | Settings | File Templates.
 */

var apple_ground = new Array();//new array of apples,which are on the ground

function expire_apple(){ // apples are coming to the tree again
  apple_ground.each(function() {

    setTimeout(function(){
       // this = (100,100, 'purple','Tree',0);
        apple.state= 'tree'; //again on tree
        apple.time= 0;  // clear time
        appleFactory.push(this)}, 2000);// return apple to the tree

  });
}



