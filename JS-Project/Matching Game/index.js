var errors=0;
var score=0;
var cardlist=[
    "p1",
    "p2",
    "p3",
    "p4",
    "p5",
    "p6",
    "p7",
    "p8",
    "p9",

]

var cardSet;
var board=[];
var rows=3;
var columes=6;
var card1Selected;
var card2Selected;



window.onload=function(){
    sheffleCards();
    startGame();
  
}

function sheffleCards(){
    cardSet=cardlist.concat(cardlist);
    for(let index=0;index<cardSet.length;index++)
    {
        let j=Math.floor(Math.random()*cardSet.length);
        let temp=cardSet[index];
        cardSet[index]=cardSet[j];
        cardSet[j]=temp;
    }
}


function startGame()
{
    for(let r=0 ; r<rows;r++)
    {
        let row=[];
        for(let c=0; c<columes;c++)
        {
            let cardImage=cardSet.pop();
             row.push(cardImage);
             let card=document.createElement("img");
             card.id=r.toString() +"-"+c.toString();
             card.src=cardImage +".jpg";
             card.classList.add("card");
             card.addEventListener("click" ,selectCard)
             document.getElementById("board").append(card);
        }
        board.push(row)
    }
    console.log(board);
     setTimeout(hideCards,1000);
}




function hideCards()
{
    for(let index=0; index<rows;index++)
    {
        for(let j=0 ; j<columes;j++)
        {
            let card=document.getElementById(index.toString()+"-"+j.toString());
            card.src="back.jpg";
        }
    }
}


function selectCard()
{
    if(this.src.includes("back"))
    {
        if(!card1Selected)
        {
           card1Selected=this;
           let coords=card1Selected.id.split("-");
           let r=parseInt(coords[0]);
           let c=parseInt(coords[1]);
           card1Selected.src=board[r][c]+".jpg";
        }
        else if(!card2Selected && this !=card1Selected)
        {
           card2Selected=this;
           let coords=card2Selected.id.split("-");
           let r=parseInt(coords[0]);
           let c=parseInt(coords[1]);
           card2Selected.src=board[r][c]+".jpg";
           setTimeout(update,1000)

        }

    }
}


function update()
{
    if(card1Selected.src !=card2Selected.src)
    {
        card1Selected.src="back.jpg";
        card2Selected.src="back.jpg";
        errors+=1;
        document.getElementById("errors").innerHTML=errors
    }
    else
    {
    score+=1;
    document.getElementById("score").innerHTML=score
    }
    card1Selected=null;
    card2Selected=null;
    update2()
};
function update2()
{
    if(score==9)
    {
        open("page2.html");
    }
};


// const StartSound = new Audio('/audio.mp3');

// function sound() {
//     StartSound.play();
// }
// StartSound.addEventListener('ended', function () {
//     this.currentTime = 0;
//     this.play();
// }, false);


function PlayAudion()
{
   
    document.getElementById("myaudio").play();
  
}
