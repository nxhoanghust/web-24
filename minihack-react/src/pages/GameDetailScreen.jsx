import React from 'react';
import './style2.css';
class GameDetailScreen extends React.Component {
    componentDidMount() {
        //get gameIdfrom url
        console.log(this.props.match.params.gameId);

        //fetch gameinfo
        fetch(`http://localhost:8080/find-game`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.props.match.params.gameId,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                for (let i = 1; i <= 4; i++) {
                    document.querySelector(`.name${i}`).innerHTML = `${data.score.name[i-1]}`;
                }
                //console.log(data.score.score.length);
                if (data.score.score.length == 0) {
                    //console.log('false');
                    var n = 0;
                    var arr = [[]];
                    var tmpCol = [];
                    var colTotal = [];
                    for (let i = 0; i < 4; i++) {
                        colTotal[i] = 0;
                    }
                    document.querySelector('.input-body').addEventListener('submit', (event) => {
                        event.preventDefault();
                        document.querySelector(`#round`).insertAdjacentHTML('beforeend', `
                        <div class='row color${n%2}'>
                        <div class='col-4'>Round ${n + 1}</div>
                        <div  class="form-group  col-2">
                        <input class="round1${n + 1} form-control">
                    </div>
                    <div  class="form-group  col-2">
                        <input class="round2${n + 1} form-control">
                    </div>
                    <div class="form-group  col-2">
                        <input class="round3${n + 1} form-control">
                    </div>
                    <div class="form-group  col-2">
                        <input class="round4${n + 1} form-control">
                    </div>
                    </div>`);
    
                        n++;
                    });
                    document.querySelector(`#round`).addEventListener("input", () => {
                        arr = [];
                        var total = 0;
                        for (let i = 0; i < 4; i++) {
                            colTotal[i] = 0;
                            tmpCol = [];
                            for (let j = 0; j < n; j++) {
                                var x = document.querySelector(`.round${i + 1}${j + 1}`);
                                tmpCol.push(Number(x.value));
                                console.log(arr);
                                colTotal[i] += Number(x.value);
                            }
                            arr.push(tmpCol);
                            document.querySelector(`#total${i + 1}`).innerHTML = colTotal[i];
                            total += colTotal[i];
                            document.querySelector('#total-all').innerHTML = `Total Score(${total})`;
    
                        }
                        //console.log(window.location)
                        fetch('http://localhost:8080/update', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                score: arr,
                                id: this.props.match.params.gameId,
                            }),
                        })
                            .then((res) => {
                                return res.json;
                            })
                            .catch((error) => {
                                console.log(error);
                                window.alert(error.message);
                            });
                    });
                } else {
                    console.log('true');
                    var n = data.score.score[0].length;
                    console.log(n);
                    var arr = [[]];
                    var tmpCol = [];
                    var colTotal = [];
                    for (let i = 0; i < 4; i++) {
                        colTotal[i] = 0;
                    }
                    for (let i = 0; i < n; i++) {
                        //var m=0
                        //console.log('a');
                        document.querySelector(`#round`).insertAdjacentHTML('beforeend', `
                        <div class='row color${i%2}'>
                        <div class='col-4'>Round ${i + 1}</div>
                        <div  class="form-group  col-2">
                        <input class="round1${i + 1} form-control">
                    </div>
                    <div  class="form-group  col-2">
                        <input class="round2${i + 1} form-control">
                    </div>
                    <div class="form-group  col-2">
                        <input class="round3${i + 1} form-control">
                    </div>
                    <div class="form-group  col-2">
                        <input class="round4${i + 1} form-control">
                    </div>
                    </div>`);
                        //console.log(m);  
                    }
                    var x = 0;
                    for (let i = 0; i < 4; i++) {
                        var totalcol = 0;
                        for (let j = 0; j < n; j++) {
                            document.querySelector(`.round${i + 1}${j + 1}`).value = data.score.score[i][j];
                            totalcol += data.score.score[i][j];
                        }
                        x += totalcol;
                        document.querySelector(`#total${i + 1}`).innerHTML = `${totalcol}`;
                    }
                    document.querySelector(`#total-all`).innerHTML = `Total Score(${x})`;
    
    
                    document.querySelector('.input-body').addEventListener('submit', (event) => {
                        event.preventDefault();
                        document.querySelector(`#round`).insertAdjacentHTML('beforeend', `
                        <div class='row color${n%2}'>
                        <div class='col-4'>Round ${n + 1}</div>
                        <div  class="form-group  col-2">
                        <input class="round1${n + 1} form-control">
                    </div>
                    <div  class="form-group  col-2">
                        <input class="round2${n + 1} form-control">
                    </div>
                    <div class="form-group  col-2">
                        <input class="round3${n + 1} form-control">
                    </div>
                    <div class="form-group  col-2">
                        <input class="round4${n + 1} form-control">
                    </div>
                    </div>`);
    
                        n++;
                    });
                    document.querySelector(`#round`).addEventListener("input", () => {
                        arr = [];
                        var total = 0;
                        for (let i = 0; i < 4; i++) {
                            colTotal[i] = 0;
                            tmpCol = [];
                            for (let j = 0; j < n; j++) {
                                var x = document.querySelector(`.round${i + 1}${j + 1}`);
                                tmpCol.push(Number(x.value));
                                //console.log(arr);
                                colTotal[i] += Number(x.value);
                            }
                            arr.push(tmpCol);
                            document.querySelector(`#total${i + 1}`).innerHTML = colTotal[i];
                            total += colTotal[i];
                            document.querySelector('#total-all').innerHTML = `Total Score(${total})`;
    
                        }
                        //console.log(window.location)
                        fetch('http://localhost:8080/update', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                score: arr,
                                id: this.props.match.params.gameId,
                            }),
                        })
                            .then((res) => {
                                return res.json;
                            })
                            .catch((error) => {
                                console.log(error);
                                window.alert(error.message);
                            });
                    });
                }
            })
            .catch((er) => {
                console.log(er);
                window.alert(er.message);
            });
    };

    render() {
        return (
            <div className="container">
                <div className="row container header-c">
                    <div className="header">ScoreKeeper</div>
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-2 name1" id="name"></div>
                    <div className="col-2 name2" id="name"></div>
                    <div className="col-2 name3" id="name"></div>
                    <div className="col-2 name4" id="name"></div>
                </div>
                <div className="row row-color">
                    <div className="col-4" id="total-all">Total Score</div>
                    <div id="total1" className="col-2"></div>
                    <div id="total2" className="col-2"></div>
                    <div id="total3" className="col-2"></div>
                    <div id="total4" className="col-2"></div>
                </div>
                <form className="input-body">
                    <div id="round">

                    </div>
                    <div className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-12 col-sm-4">
                            <button type="submit" className="btn btn-primary button">ADD ROUND</button>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>

                </form>
            </div>
        );
    }
}

export default GameDetailScreen;