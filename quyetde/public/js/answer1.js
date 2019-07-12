let value =[];
function loadQuestion() {
    fetch(`/get-random-question`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            document.getElementById('cauhoi').innerHTML = data.questionContent;
            value = data;
            console.log(value);
        })
        .catch((error) => {
            console.log(error);
            //window.alert(error.message);
        });
}
function updateFalse() {
    fetch(`/update`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            id: value.id,
            dislike: value.dislike + 1,
            like: value.like,
        }),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            window.location.href = "./ask/" + value.id;
            if (data.success) {
            }
            else {
                //window.alert(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
            //window.alert(error.message);
        });
}

function updateTrue() {
    fetch(`/update`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            id: value.id,
            dislike: value.dislike,
            like: value.like + 1,
        }),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            window.location.href = "./ask/"+value.id;
            if (data1.success) {
            }
            else {
                //window.alert(data.message);
            }
        })
        .catch((error) => {
            //window.alert(error.message);
            console.log(error);
        });
}

function showVote() {
    window.location.href = "./ask/" + value.id;
};