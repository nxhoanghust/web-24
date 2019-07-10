const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/index.html'));
});

app.get('/ask', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/index1.html'));
});

/*app.post(`/create-question`,(req,res)=>{
    console.log(req.query);
});*/

//body
app.post(`/create-question`, (req, res) => {
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

});

app.post(`/data-update`, (req, res) => {
    fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.status(500).json({
                sucess: false,
                message: error.message,
            });
        } else {
            const questionList = JSON.parse(data);
            //const questionUpdate = questionList[req.body.number];
            /*const questionUpdate = {
                id: req.body.id,
                questionContent: req.body.content,
                like: req.body.like,
                dislike: req.body.dislike,
                createAt: req.body.createAt,
            };*/
            for (let i = 0; i <= questionList.length; i++) {
                console.log(i);
                if (questionList[i] === req.body.id) {
                    questionList[i].like = req.body.like;
                    questionList[i].dislike = req.body.dislike;
                    break;
                }
            }
            fs.writeFile('./data.json', JSON.stringify(questionList), { encoding: 'utf8' }, (error) => {
                if (error) {
                    res.status(500).json({
                        sucess: false,
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


/*app.get('/ask/:id', (req, res) => {
    fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.status(500).json({
                sucess: false,
                message: error.message,
            });
        } else {
            const questionList = JSON.parse(data);
            const questionPop = questionList.pop();
            //res.json(questionList);
            //console.log(res.json(questionPop).questionContent);
            //console.log(questionPop);
            //console.log(req.params);
            JSON.stringify(questionPop);
            res.json({
                id: questionPop.id,
                content: questionPop.questionContent,
                like: questionPop.like,
                dislike: questionPop.dislike,
            });
 
        }
    });
});*/

app.get('/ask/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/vote.html'));

});

app.get(`/data`, (req, res) => {
    fs.readFile('./data.json', (error, data) => {
        //res.sendFile(path.resolve(__dirname, './data.json'));
        const questionList = JSON.parse(data);
        var random = Math.floor(Math.random() * questionList.length);
        //console.log(questionList[random]);
        res.json(questionList[random]);
    });
});


app.listen(3000);