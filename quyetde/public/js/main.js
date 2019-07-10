window.onload = function () {
    fetch('/datatmp', {
        method: 'GET',
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            var total = data.like + data.dislike;
            if (total == 0) {
                var percentlike = 50;
                var percentdislike = 50;
            } else {
                var percentlike = Math.floor((data.like / total) * 100);
                var percentdislike = 100 - percentlike;
            }
            document.getElementById('total').innerHTML = total +" vote";
            document.getElementById('question').innerHTML = data.questionContent;
            document.getElementById('textlike').innerHTML = percentlike + "%";
            document.getElementById('textdislike').innerHTML = percentdislike + "%";
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });

}
