const express = require('express');
const path =require('path');

const app=express();
app.use(express.static('public'));

app.get('/',(req,res) =>{
    res.sendFile(path.resolve(__dirname,'./public/html/index.html'));
});

app.get('/about',(req,res) =>{
    res.send("Thanks for submit!!");
});
app.listen(3000);