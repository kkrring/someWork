let pics = ["open.jpg","kittens.jpg"];
let s = document.getElementsByTagName("img");
let a = null;
let isOpen = false;
let count = 0;

for (let i = 0; i < s.length; i++) {
    let num = parseInt(Math.random()*100);
    s[i].onclick = function () {
        count= count + 1;
        if (isOpen == true) {
            num = 1;
        }

        if (num % 2 == 1) {
            a = 0;
            this.src=pics[a];
        }
        else {
            a = 1;
            this.src=pics[a];
            isOpen = true;
            alert("You have got it right by " + count + " times !")
        }
    }
}

