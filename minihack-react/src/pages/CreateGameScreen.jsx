import React from 'react';
import './style.css';
class CreateGameScreen extends React.Component {
    submitPlayer = (event) => {
        event.preventDefault();
        var p1 = document.querySelector(`#player1`).value;
        var p2 = document.querySelector(`#player2`).value;
        var p3 = document.querySelector(`#player3`).value;
        var p4 = document.querySelector(`#player4`).value;
        //console.log(p1);
        if ((p1.length != 0) && (p2.length != 0) && (p3.length != 0) && (p4.length != 0)) {
            console.log("a");
            fetch('http://localhost:8080/create-new-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    player1: p1,
                    player2: p2,
                    player3: p3,
                    player4: p4,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    //window.location.href = `http://localhost:8080/games/${data.id}`;
                    this.props.history.push(`/games/${data.id}`);
                })
                .catch((error) => {
                    if (error) {
                        console.log(error);
                        window.alert(error.message);
                    }
                });
        } else {
            console.log('pls entera');
            document.querySelector('.noti').insertAdjacentHTML('beforeend',
                `<div class="alert alert-danger" role="alert" > Please enter the player names!</div>`);
        }
    };

    inputChange = () => {
        var x = document.querySelector('.noti');
        if (x.hasChildNodes()) {
            x.removeChild(x.lastChild);
        }
    };
    render() {
        return (
            <div className="container">
                <div className="row container header-c">
                    <div className="header">ScoreKeeper</div>
                </div>
                <div className="row">
                    <form className="input-body container" onSubmit={this.submitPlayer}>
                        <div className="form-group col-15">
                            <input id="player1" className="form-control" placeholder="Enter name of player 1" onInput={this.inputChange}/>
                        </div>
                        <div className="form-group col-15">
                            <input id="player2" className="form-control" placeholder="Enter name of player 2" onInput={this.inputChange}/>
                        </div>
                        <div className="form-group col-15">
                            <input id="player3" className="form-control" placeholder="Enter name of player 3" onInput={this.inputChange}/>
                        </div>
                        <div className="form-group col-15">
                            <input id="player4" className="form-control" placeholder="Enter name of player 4" onInput={this.inputChange}/>
                        </div>
                        <div className="row">
                            <div className="col-sm-4"></div>
                            <div className="col-12 col-sm-4">
                                <button type="submit" className="btn btn-primary button">CREATE NEW GAME</button>
                            </div>
                            <div className="col-sm-4"></div>
                        </div>
                    </form>

                </div>
                <div className="noti">
                </div>
            </div>
        );
    }
}

export default CreateGameScreen;