import React from 'react';
class CreateGameScreen extends React.Component {
    render() {
        return (
            <div class="container">
                <div class="row container header-c">
                    <div class="header">ScoreKeeper</div>
                </div>
                <div class="row">
                    <form class="input-body container">
                        <div class="form-group col-15">
                            <input id="player1" class="form-control" placeholder="Enter name of player 1" />
                        </div>
                        <div class="form-group col-15">
                            <input id="player2" class="form-control" placeholder="Enter name of player 2" />
                        </div>
                        <div class="form-group col-15">
                            <input id="player3" class="form-control" placeholder="Enter name of player 3" />
                        </div>
                        <div class="form-group col-15">
                            <input id="player4" class="form-control" placeholder="Enter name of player 4" />
                        </div>
                        <div class="row">
                            <div class="col-sm-4"></div>
                            <div class="col-12 col-sm-4">
                                <button type="submit" class="btn btn-primary button">CREATE NEW GAME</button>
                            </div>
                            <div class="col-sm-4"></div>
                        </div>
                    </form>

                </div>
                <div class="noti">
                </div>
            </div>
        );
    }
}

export default CreateGameScreen;