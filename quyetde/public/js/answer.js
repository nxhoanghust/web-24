function loadQuestion() {
    fetch(`/data`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            document.getElementById('cauhoi').innerHTML = data.questionContent;
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });

}

function funtionFalse() {
    fetch(`/data`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const x = data;
            fetch(`/data-update`, {
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
                    console.log(data1.dislike)
                    if (data1.success) {
                        window.location.href = `../question/`+data1.id;
                    }
                    else { window.alert(data.message); }
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
    fetch(`/data`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const x = data;
            fetch(`/data-update`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    id: x.id,
                    dislike: data.dislike,
                    like: x.like + 1,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data1) => {
                    console.log(data1.agree)
                    if (data1.success) {
                        window.location.href = `../ask/`+data1.id;
                    }
                    else { window.alert(data1.message); }
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