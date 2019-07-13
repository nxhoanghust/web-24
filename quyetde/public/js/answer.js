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
            console.log(data);
            selectedQuestion = data.data;
            console.log(selectedQuestion._id);
            document.querySelector('#cauhoi').innerHTML = selectedQuestion.questionContent;
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);

        });
    const voteQuestion = (vote) => {
        console.log(selectedQuestion._id);
        fetch('/vote', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: selectedQuestion._id,
                vote: vote,
            }),
        })
            .then((res) => {
                window.location.href = `/ask/${selectedQuestion._id}`
                //window.location.href ="https://www.google.com";
            })
            .catch((error) => {
                console.log(error);
                window.alert(error.message);
            });
    };
    document.querySelector(".true").addEventListener('click', () => {
        voteQuestion("like");
    });
    document.querySelector(".false").addEventListener('click', () => {
        voteQuestion("dislike");
    });
}