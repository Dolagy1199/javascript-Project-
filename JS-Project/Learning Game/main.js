var input = document.getElementById("num-of-lett");
var button = document.getElementById("gn-button");
var div1 = document.getElementById("lett-butt");
var div2 = document.getElementById("lett-img");

// Function To Play Audio Through The Game
const StartSound = new Audio('./audios/startSong.mp3');
function sound() {
    StartSound.play();
}
StartSound.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);

// Function for check the key of localstorage
function uniqueKey(curr) {
    let rep = 0;
    this.curr = curr;
    for (let i = 0; i < localStorage.length; i++) {
        let temp = localStorage.key(i);
        if (temp.includes(curr)) {
            rep = rep + 1;
            console.log(rep + " " + curr);
        }
    }
    return rep;
}

//Function template (interactions)
function interactions(type, target, time) {
    this.type = type;
    this.target = target;
    this.time = time;
}

// Window load
window.addEventListener('load', function (e) {
    let rep = uniqueKey("document");

    localStorage.setItem("document " + rep++, JSON.stringify(new interactions(e.type, e.target.toString(), new Date())));

});

//Window unload
window.addEventListener('unload', function (e) {
    let rep = uniqueKey("document");
    localStorage.setItem("document " + rep++, JSON.stringify(new interactions(e.type, e.target.toString(), new Date())));

});

// Display Random Values
var random_char = [];

function random_letters() {

    for (var i = 1; random_char.length <= input.value; i++) {
        var arr_char = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
            "K", "L", "M", "N", "O", "P", "Q", "R",
            "S", "T", "U", "V", "W", "X", "Y", "Z"
        ];
        var ran_value = '';
        var char_Length = arr_char.length;
        var x = Math.random();
        while (char_Length--) {
            ran_value = Math.floor(x * char_Length);
            random_char.push(arr_char[ran_value]);
            arr_char.splice(ran_value, 1);
        }

    }
}

//Click on the “generate” button
button.addEventListener('click', function (e) {
    // console.log("click on generate button");
    random_char = [];
    div1.innerHTML = "";
    div2.innerHTML = "";
    //Clicks stored into Local Storage
    let rep = uniqueKey("Generate");
    localStorage.setItem("Generate " + rep++, JSON.stringify(new interactions(e.type, e.target.value, new Date())));
    // Check the input value 
    if (input.value >= 1 && input.value <= 26) {
        for (var i = 0; i < input.value; i++) {
            random_letters();
            // Create New Button & append it with div1
            newbutton = document.createElement("button");
            newbutton.style.cursor = "pointer";
            newbutton.style.width = "50px";
            newbutton.style.height = "30px";
            newbutton.style.fontWeight = "bold";
            newbutton.style.fontSize = "15px";
            newbutton.style.backgroundColor = "rgb(74 211 229)";
            newbutton.style.marginLeft = ".2rem";
            newbutton.append(newbutton.value = random_char[i]);
            div1.appendChild(newbutton);
            // Array Of Images
            var arr_of_images = ["images//A.jpg", "images//B.jpg", "images//C.jpg", "images//D.jpg", "images//E.jpg",
                "images//F.jpg", "images//G.jpg", "images//H.jpg", "images//I.jpg", "images//J.jpg", "images//K.jpg",
                "images//L.jpg", "images//M.jpg", "images//N.jpg", "images//O.jpg", "images//P.jpg", "images//Q.jpg",
                "images//R.jpg", "images//S.jpg", "images//T.jpg", "images//U.jpg", "images//V.jpg", "images//W.jpg",
                "images//X.jpg", "images//Y.jpg", "images//Z.jpg"
            ];

            var image = document.createElement('img');
            // var audio = document.getElementById('audio');
            image.style.borderRadius = "8px";
            image.style.width = "300px";
            image.style.height = "250px";

            //Click on the letters buttons
            newbutton.addEventListener('click', function (e) {
                for (var j = 0; j < arr_of_images.length; j++) {
                    if (arr_of_images[j][8] == e.target.innerHTML) {
                        image.setAttribute("src", arr_of_images[j]);
                        div2.appendChild(image);
                    }

                }
                let rep = uniqueKey(e.target.value);
                localStorage.setItem(e.target.value + " " + rep++, JSON.stringify(new interactions(e.type, e.target.value, new Date())));

            });

        }
    } else {
        alert("This Is Invalid Number !!");
    }
});