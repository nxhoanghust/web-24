const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const questionModel = require('./models/question.model');
mongoose.set('useFindAndModify', false);


mongoose.connect(
    'mongodb://localhost:27017/quyetde',
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
                res.sendFile(path.resolve(__dirname, './public/html/index.html'));
            });

            app.get('/ask', (req, res) => {
                res.sendFile(path.resolve(__dirname, './public/html/index1.html'));
            });

            app.get('/vote', (req, res) => {
                res.sendFile(path.resolve(__dirname, './public/html/vote.html'));
            });

            app.get(`/ask/:id`, (req, res) => {
                res.sendFile(path.resolve(__dirname, './public/html/vote.html'));
            });

            app.get(`/find`, (req, res) => {
                res.sendFile(path.resolve(__dirname, './public/html/find.html'));
            });

            /*app.post(`/create-question`,(req,res)=>{
                console.log(req.query);
            });*/

            //body
            app.post(`/create-question`, (req, res) => {
                console.log(req.body);
                questionModel.create({
                    questionContent: req.body.content,
                }, (error, data) => {
                    if (error) {
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
            /*
              //save question to database
              //questionContent
              //like
              //dislike
              //createAt
 
 
              //save  new question
              fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
                  if (error) {
                      res.status(500).json({
                          sucess: false,
                          message: error.message,
                      });
                  } else {
                      const questionList = JSON.parse(data);
                      const newQuestionId = new Date().getTime();
                      const newQuestion = {
                          id: newQuestionId,
                          questionContent: req.body.content,
                          like: 0,
                          dislike: 0,
                          createAt: new Date().toString(),
                      };
                      questionList.push(newQuestion);
                      fs.writeFile('./data.json', JSON.stringify(questionList), { encoding: 'utf8' }, (error) => {
                          if (error) {
                              res.status(500).json({
                                  sucess: false,
                                  message: error.message,
                              });
                          } else {
                              res.status(201).json({
                                  sucess: true,
                                  id: newQuestionId,
                              });
                          }
                      });
 
                  }
 
              });
 
          });*/



            app.post(`/update`, (req, res) => {
                fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
                    if (error) {
                        res.status(500).json({
                            sucess: false,
                            message: error.message,
                        });
                    } else {
                        const questionList1 = JSON.parse(data);
                        //const questionUpdate = questionList[req.body.number];
                        /*const questionUpdate = {
                            id: req.body.id,
                            questionContent: req.body.content,
                            like: req.body.like,
                            dislike: req.body.dislike,
                            createAt: req.body.createAt,
                        };*/
                        for (let i = 0; i < questionList1.length; i++) {
                            if (questionList1[i].id === req.body.id) {
                                questionList1[i].like = req.body.like;
                                questionList1[i].dislike = req.body.dislike;
                                break;
                            }
                        }
                        fs.writeFile('./data.json', JSON.stringify(questionList1), { encoding: 'utf8' }, (error) => {
                            if (error) {
                                res.status(500).json({
                                    message: error.message,
                                });
                            } else {
                                res.status(201).json({
                                    sucess: true,
                                });
                            }
                        });

                    }

                });

            });


            /*app.get(`/ask/:id`, (req, res) => {
                questionModel.findById(req.params, (error, data) => {
                    if (error) {
                        res.status(500).json({
                            sucess: false,
                            message: error.message,
                        });
                    } else {

                    }
                });*/
            //mongo
            /*fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
                if (error) {
                    res.status(500).json({
                        sucess: false,
                        message: error.message,
                    });
                } else {
                    const questionList2 = JSON.parse(data);
                    var i = 0;
                    while (1) {
                        if (req.params.id == questionList2[i].id) {
                            break;
                        }
                        else i++;
                    }
                    fs.writeFile('./tmp.json', JSON.stringify(questionList2[i]), { encoding: 'utf8' }, (error) => {
                        if (error) {
                            res.status(500).json({
                                message: error.message,
                            });
                        }
                    });

                }

            });*/
            /*     res.sendFile(path.resolve(__dirname, './public/html/vote.html'));
             });
 
             app.get(`/datatmp`, (req, res) => {
                 fs.readFile('./tmp.json', (error, data) => {
                     const aloha = JSON.parse(data);
                     res.json(aloha);
                 });
             });*/


            app.get(`/get-random-question`, (req, res) => {
                questionModel.countDocuments().exec(function (error, count) {
                    var random = Math.floor(Math.random() * count);
                    questionModel.findOne().skip(random).exec(function (error, data) {
                        if (error) {
                            res.status(500).json({
                                sucess: false,
                                message: error.message,
                            });
                        } else {
                            res.status(200).json({
                                sucess: true,
                                data: data,
                            });
                        }
                    });

                });



                /*fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
                    if (error) {
                        res.status(500).json({
                            sucess: false,
                            message: error.message,
                        });
                    } else {
                        //res.sendFile(path.resolve(__dirname, './data.json'));
                        const questionList = JSON.parse(data);
                        var random = Math.floor(Math.random() * questionList.length);
                        //console.log(questionList[random]);
                        res.status(200).json({
                            sucess: true,
                            data: questionList[random],
                        });
                    }*/
            });

            app.get('/get-question-by-id/:id', (req, res) => {
                console.log(req.params.id);
                questionModel.findById(req.params.id, (error, data) => {
                    if (error) {
                        res.status(500).json({
                            sucess: false,
                            message: error.message,
                        });
                    } else {
                        res.status(200).json({
                            sucess: true,
                            data: data,
                        });
                    }
                });


                /*fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
                    if (error) {
                        res.status(500).json({
                            sucess: false,
                            message: error.message,
                        });
                    } else {
                        const listQuestion = JSON.parse(data);
                        let selectedQuestion;
                        for (let i = 0; i < listQuestion.length; i++) {
                            if (String(listQuestion[i].id) === req.params.questionId) {
                                selectedQuestion = listQuestion[i].questionContent;
                                break;
                            }
                        }
                        res.status(200).json({
                            sucess : true,
                            data:  selectedQuestion,
                        });
             
                    }
                })*/
            });

            app.put('/vote', (req, res) => {
                //console.log(req.body.id);
                var updateVote = req.body.vote;
                //console.log(updateVote);
                var x;
                var y;
                questionModel.findById(req.body.id, (err, value) => {
                    if (err) {
                        res.status(500).json({
                            sucess: false,
                            message: error.message,
                        });
                    } else {
                        if (updateVote === "like") {
                            //value.like++;
                            console.log(value._id);
                            questionModel.findByIdAndUpdate(value._id, { $inc: { like:1, } }, (error1) => {
                                if (error1) {
                                    res.status(500).json({
                                        sucess: false,
                                        message: error.message,
                                    });
                                } else {
                                    res.status(200).json({
                                        sucess: true,
                                    });
                                }
                            });
                        } else {
                            questionModel.findByIdAndUpdate(value._id, { $inc: { dislike:1, } }, (error1) => {
                                if (error1) {
                                    res.status(500).json({
                                        sucess: false,
                                        message: error.message,
                                    });
                                } else {
                                    res.status(200).json({
                                        sucess: true,
                                    });
                                }
                            });

                        }
                    }
                });


                /*fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
                    if (error) {
                        res.status(500).json({
                            sucess: false,
                            message: error.message,
                        })
                    } else {
                        const listQuestion = JSON.parse(data);
                        for (let i = 0; i < listQuestion.length; i++) {
                            listQuestion[i][req.body.vote] += 1;
                        }
                        fs.writeFile('./data.json', JSON.stringify(listQuestion), { encoding: 'utf8' }, (err) => {
                            if (err) {
                                res.status(500).json({
                                    sucess: false,
                                    message: err.message,
                                });
                            } else {
                                res.status(201).json({
                                    sucess: true,
                                });
                            }
                        });
                    }
                });*/
            });

            app.post(`/find-question`, (req, res) => {
                var questionFind = req.body.content.toLowerCase();
                //console.log(questionFind);
                questionModel.find({ questionContent: {$regex: questionFind} }, (error, data) => {
                    if (error) {
                        res.status(500).json({
                            sucess: false,
                            message: error.message,
                        });
                    } else {
                        console.log(data);
                        res.status(201).json({
                            sucess: true,
                            data: data,
                        });
                    }
                });
            });
            app.listen(3000);
        }
    }
);

