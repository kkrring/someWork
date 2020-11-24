let k = document.querySelectorAll("img");
do {
    bonus = parseInt(Math.random()*9);
    boom = parseInt(Math.random()*9);
} while (bonus == boom);

let countNum = 0;
let isOpen = false;

for (let i = 0; i < k.length; i++) {
    k[i].onclick = function () {
        if (isOpen == true){
            countNum = countNum;
            boom = null;
        }
        else {
            countNum = countNum + 1;
        }
        
        if (i == bonus) {
            k[i].src = "kittens.jpg";
            alert("You have got it right by " + countNum + (countNum == 1?" time!":" times!"));
            isOpen = true;
        }
    
        else {
            k[i].src = "open.jpg";
        }

        if (i == boom) {
            k[i].src = "boom.jpg";
            setTimeout(function () {window.location.reload();},5000);
            alert("Sorry, you have failed the game. Please reload it!");
        }
    }
}