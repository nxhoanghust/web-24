window.onload = () => {
    const urlPart = window.location.pathname.split('/');
    const questionid = urlPart[urlPart.length - 1];
    //fetch api, get question by id
    fetch(`/get-question-by-id/${quesitonid}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.querySelector('.question-conten').innerHTML = data.data.questionContent;
            document.querySelector('.total-vote').innerHTML = data.data.like + data.data.dislike;

            let likePercent = data.like;
            let dislikePercent = data.dislike;
            if (likePercent === 0 && dislikePercent === 0) {
                likePercent = 50;
                dislikePercent = 50;
            } else {
                likePercent = (data.data.like / (data.data.like + data.data.dislike)).toFixed;
                dislikePercent = 100 - number(likePercent);
            }

            document.querySelector('.dislike').innerHTML = `${dislikePercent}`;
            document.querySelector('.dislike').innerHTML = `${likePercent}`;
        })
        .catch((error)=>{
            console.log(error);
            window.alert(error.message);

        });
    //set question 


    //add event listener

    document.querySelector('.other-question-button').addEventListener('click',()=>{
        window.location.href = "localhost:3000/";
    });
}