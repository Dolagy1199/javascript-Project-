var img = [
    'spongbob1.jpg', 'dora1.jpg','spongbob2.jpg','dora2.jpg', 'spongbob4.jpg', 'spongbob5.jpg', 'spongbob6.jpg']

var old = 1
var clicks = 0
function randomize() {

    let root = document.documentElement
    root.style.setProperty('--image', 'url(' + img[old] + ')')
    old++
    if (old > 1) {
        old = 0
    }
    var ul = document.querySelectorAll('#puzzle-out i');
    for (var i = 0; i < ul.length; i++) {
        ul[i].style.left = Math.random() * (window.innerWidth - 100) + 'px'
        ul[i].style.top = Math.random() * (window.innerHeight - 100) + 'px'

    }

}
randomize()

function reload() {

    randomize()        

    var done = document.querySelectorAll('.done')
    done.forEach(function (e) {
        e.classList.toggle('done')
    })
    var dropped = document.querySelectorAll('.dropped')
    dropped.forEach(function (e) {
        e.classList.toggle('dropped')
    })
    var allDone = document.querySelector('.allDone')
    allDone.style = ''
    allDone.classList.toggle('allDone')
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.className);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text")
    if (ev.target.className == data) {
        ev.target.classList.add('dropped')
        document.querySelector('.' + data + "[draggable='true']").classList.add('done')

        if (document.querySelectorAll('.dropped').length == 9 && timeleft > 0) {
            document.querySelector('#puzzle-in').classList.add('allDone')
            document.querySelector('#puzzle-in').style.border = 'none'
            document.querySelector('#puzzle-in').style.animation = 'allDone 12s linear forwards'
            timeleft = 30;
             reload()
            
        }
    }
}

const bgsound = new Audio("gamemusic-6082.mp3");
function soundspong()
{
   bgsound.play();
  
}
bgsound.addEventListener('ended',function(){
   this.currentTime=0;
    this.play();
 },false);
var timeleft = 30;
var downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "Time out";
        window.open("youlost.html", '_self');

    } else {
        document.getElementById("countdown").innerHTML = "Timer : " + timeleft + "seconds";
    }
    timeleft -= 1;

}, 1000);
