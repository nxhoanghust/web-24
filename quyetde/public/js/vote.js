window.onload = () => {
    const urlPart = window.location.pathname.split('/');
    const questionid = urlPart[urlPart.length - 1];
    //fetch api, get question by id
    fetch(`/get-question-by-id/${questionid}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.querySelector('.question').innerHTML = data.data.questionContent;
            document.querySelector('#total').innerHTML = data.data.like + data.data.dislike + " vote";

            let likePercent = data.data.like;
            let dislikePercent = data.data.dislike;
            if (likePercent === 0 && dislikePercent === 0) {
                likePercent = 50;
                dislikePercent = 50;
            } else {
                likePercent = ((data.data.like / (data.data.like + data.data.dislike)) * 100).toFixed(2);
                dislikePercent = (100 - Number(likePercent)).toFixed(2);
            }

            document.querySelector('#textdislike').innerHTML = `<i class="far fa-thumbs-down"></i>` + `   ${dislikePercent}` + "%";
            document.querySelector('#textlike').innerHTML = `<i class="far fa-thumbs-up"></i>`+`    ${likePercent}` + "%";
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);

        });

    document.querySelector(".another").addEventListener('click', () => {
        window.location.href = "/";
    });
    //set question 


    //add event listener

    /*document.querySelector('.other-question-button').addEventListener('click',()=>{
        window.location.href = "localhost:3000/";
    });*/
}