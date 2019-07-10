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

function updateFalse() {
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
                .then((res1) => {
                    return res1.json();
                })
                .then((data1) => {
                    if (data1.success) {
                        // window.location.href = `../ask/` + x.id;
                    }
                    else { window.alert(data1.message); 
                    }
                })
                .catch((error1) => {
                    console.log(error1);
                    window.alert(error1.message);
                });
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });
}

function updateTrue() {
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
                    dislike: data.dislike,
                    like: data.like + 1,
                }),
            })
                .then((res1) => {
                    return res1.json();
                })
                .then((data1) => {
                    console.log(data1.like);
                    if (data1.success) {
                       // window.location.href = `../ask/` + x.id;
                    }
                    else { window.alert(data1.message); 
                    }
                })
                .catch((error1) => {
                    window.alert(error1.message);
                    console.log(error1);
                });
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });
}