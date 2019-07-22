const express = require('express');
const path = require(`path`);
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const ParentModel = require('./models/question.model');
mongoose.set('useFindAndModify', false);


mongoose.connect(
    'mongodb://localhost:27017/mnhack',
    { useNewUrlParser: true },
    (e) => {
        if (e) {
            console.log(e);
        } else {
            console.log('Connect to Mongodb sucess');
            const app = express();


            app.use(express.static('public'));
            app.use(bodyParser.json());


            app.get('/', (req, res) => {
                //res.send('Test');
                res.sendFile(path.resolve(__dirname, './public/html/index.html'));
            });

            app.get('/games/:id', (req, res) => {
                res.sendFile(path.resolve(__dirname, './public/html/index2.html'));
            });
            app.post('/create-new-game', (req, res) => {
                var x = req.body;
                var arr = [];
                arr.push(x.player1);
                arr.push(x.player2);
                arr.push(x.player3);
                arr.push(x.player4);
                console.log(arr);
                ParentModel.create({
                    name: arr,
                }, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({
                            sucess: false,
                            message: error.message,
                        });
                    } else {
                        res.status(201).json({
                            sucess: true,
                            id: data._id,
                        });
                    }
                });
            });
            app.post('/update/', (req, res) => {
                var score = req.body.score;
                console.log(score);
                console.log(req.body.id);
                ParentModel.findOneAndUpdate({ _id: req.body.id }, { score: score }, (error, data) => {
                    if (error) {
                        res.json({
                            success: false,
                            message: error.message,
                        });
                    }
                    else {
                        res.status(201).json({
                            success: true,
                        });
                    }
                });
            });
            app.post('/find-game', (req, res) => {
                ParentModel.findById(req.body.id, (error, data) => {
                    console.log(data);
                    if (error) {
                        res.json({
                            success: false,
                            message: error.message,
                        });
                    } else {
                        res.status(201).json({
                            sucess: true,
                            score: data,
                        });
                    }
                });
            });
            app.listen(8080);
        }
    }
);
