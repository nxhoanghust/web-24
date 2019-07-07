const express = require('express');
const path =require('path');
const bodyParser = require('body-parser');
const fs=require('fs');

const app=express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/',(req,res) =>{
    res.sendFile(path.resolve(__dirname,'./public/html/index.html'));
});

app.get('/about',(req,res) =>{
    res.send("Thanks for submit!!");
});

/*app.post(`/create-question`,(req,res)=>{
    console.log(req.query);
});*/


//body
app.post(`/create-question`,(req,res)=>{
    //save question to database
    //questionContent
    //like
    //dislike
    //createAt



    //save  new question
    fs.readFile('./data.json',{encoding: 'utf8'},(error,data)=>{
        if(error){
            res.status(500).json({
                sucess:false,
                message: error.message,
            });
        }else{
            const questionList  = JSON.parse(data);
            const newQuestionId = new Date().getTime();
            const newQuestion= {
                id: newQuestionId,
                questionContent: req.body.questionContent,
                like:0,
                dislike:0,
                createAt: new Date().toString(),
            };
            questionList.push(newQuestion);
            fs.writeFile('./data.json', JSON.stringify(questionList),{encoding: 'utf8'},(error) =>{
                if(error){
                    res.status(500).json({
                        sucess:false,
                        message: error.message,
                    });
                } else{
                    res.status(201).json({
                        sucess:true,
                        id: newQuestionId,
                    });
                }
            });

        }
        
    });

});

app.listen(3000);