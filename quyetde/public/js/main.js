//query element object
//document.getElementById();
//document.getElementsByClassName();
//document.querySelector();
//document.querySelectorAll();
//addeventListener
//elementObect.addEventListener();
const maxLength = 200;

window.onload = function () {
    var input = document.getElementById('myInput');
    input.addEventListener("input", () => {
        var x = input.value.length;
        if (check(x)) {
            document.getElementById('demo').innerHTML = "Character left: " + (200 - x) + "/200";
            document.getElementById('result').innerHTML = "";
            document.getElementById('noti').innerHTML = "";
        }
        else {
            document.getElementById('demo').innerHTML = "Character left: 0/200";
            document.getElementById('result').innerHTML = "Your question is more than 200 characters!!";
        }
    });
    var submit = document.getElementById('submit');
    submit.addEventListener('click', () => {
        var x = input.value.length;
        if(x!=0 && check(x)){
            window.location.href = '../about';
        }
        else if(x==0){
            document.getElementById('noti').innerHTML = "Please enter question!!";

        }
        else{

        }
    });
}



function check(length) {
    if (length > maxLength) return false;
    else return true;
}

