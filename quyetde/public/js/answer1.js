function question() {
    fetch('/data', {
        method: "GET",
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            document.getElementById('cauhoi').innerHTML = data.questionContent;
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });
}

function funtionFalse() {
    fetch('/data', {
        method: "GET",
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            fetch('/data-update', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: data.id,
                    dislike: data.dislike + 1,
                    like: data.like,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data1) => {
                    if (data1.sucess) {
                        window.location.href = "http://localhost:3000/ask/" + data1.id;
                    }
                    else {
                        window.alert(data1.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    window.alert(error.message);
                });
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });
}

function funtionTrue() {
    fetch('/data', {
        method: "GET",
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            fetch('/data-update', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: data.id,
                    dislike: data.dislike,
                    like: data.like + 1,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data1) => {
                    if (data1.sucess) {
                        window.location.href = "http://localhost:3000/ask/" + data1.id;
                    }
                    else {
                        window.alert(data1.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    window.alert(error.message);
                });
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });
}