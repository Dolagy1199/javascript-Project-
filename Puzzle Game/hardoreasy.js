const bgsound = new Audio("gamemusic-6082.mp3");
function soundspong()
{
   bgsound.play();
  
}
bgsound.addEventListener('ended',function(){
   this.currentTime=0;
    this.play();
 },false);