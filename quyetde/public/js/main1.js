window.onload = () => {
    let selectedQuestion;
    fetch('/get-random-question', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((res) => res.json())
        .then((data) => {
            selectedQuestion = data.data;
            document.querySelector('question-conten').innerHTML = selectedQuestion;
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);

        });
    const voteQuestion = (vote) => {
        fetch('/vote', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id: selectedQuestion.id,
                vote:vote,
            }),
        })
        .then((res)=>{
            window.location.href=`/ask/${selectedQuestion.id}`
        })
        .catch((error)=>{
            console.log(error);
            window.alert(error.message);
        });
    }
}