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
            document.querySelector("#delete").innerHTML="";
        }
        else {
            document.getElementById('demo').innerHTML = "Character left: 0/200";
            document.getElementById('result').innerHTML = "Your question is more than 200 characters!!";
        }
    });
    var submit = document.getElementById('submit');
    submit.addEventListener('click', (event) => {
        const questionContent = input.value;
        var x = input.value.length;
        if (x != 0 && check(x)) {
            fetch(`/find-question`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: questionContent,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.sucess) {
                        //redirect question details
                        if (data.data.length == 0) {
                            document.querySelector("#noti").innerHTML = "No question found!!";
                        } else {
                            for (let i = 0; i < data.data.length; i++) {
                                document.querySelector('#delete').insertAdjacentHTML('afterbegin',
                                    '<div class="found" id="question"></div>   <div class="found" id="like"></div> <div class="found" id="dislike"></div> <div class="found" id="createat"></div>');
                                document.querySelector("#question").innerHTML = "Question: "+data.data[i].questionContent;
                                document.querySelector('#like').innerHTML = "Like: "+data.data[i].like;
                                document.querySelector('#dislike').innerHTML = "Dislike: "+data.data[i].dislike;
                                document.querySelector('#createat').innerHTML = "CreateAt: "+data.data[i].createAt;
                            }
                        }
                        //window.location.href = `./find/${data.data._id}`;
                    } else {
                        window.alert(data.message);
                    }
                })
                .catch((error) => {
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