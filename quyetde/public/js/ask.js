
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
        var y = 200 - x;
        if (check(x)) {
            document.getElementById('demo').innerHTML = `Characters left: ${y}/200`;
            document.getElementById('result').innerHTML = "";
            document.getElementById('noti').innerHTML = "";
        }
        else {
            document.getElementById('demo').innerHTML = "Character left: 0/200";
            document.getElementById('result').innerHTML = "Your question is more than 200 characters!!";
        }
    });

    //url param
    //url query
    var submit = document.getElementById('submit');
    submit.addEventListener('click', (event) => {
        const questionContent = input.value;
        var x = input.value.length;
        if (x != 0 && check(x)) {
            fetch(`/create-question`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: questionContent,
                }),
            })
                .then((res)=>{
                    return res.json();
                })
                .then((data)=>{
                    if(data.sucess){
                        //redirect question details
                        
                        window.location.href= 'http://localhost:3000/ask/'+data.id;
                        console.log(data);
                    }else{
                        window.alert(data.message);
                    }
                })
                .catch((error)=>{
                    console.log(error);
                    window.alert(error.message);
                });

        }
        else if (x == 0) {
            document.getElementById('noti').innerHTML = "Please enter question!!";

        }
        else {

        }
    });
}



function check(length) {
    if (length > maxLength) return false;
    else return true;
}

