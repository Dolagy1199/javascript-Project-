
const gameover= new Audio("game-over-arcade-6435.mp3");
function lsound() {
    gameover.play();

}
gameover.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);
