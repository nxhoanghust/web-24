const express = require('express');
const bodyParser = require('body-Parser');
const mongoose = require('mongoose');
const userRouter = require('./users/users.router');
const session = require('express-session');
mongoose.connect('mongodb://localhost:27017/techkid-hotgirl', (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Connect to mongodb sucess');

        const app = express();

        //use middleware
        app.use(bodyParser.json());
        app.use(session({
            secret: 'keyboard cat',
        }));
        //router
        app.use('/users', userRouter);

        // start sv
        app.listen(3001, (error) => {
            if (error) {
                throw error;
            } else {
                console.log('Server listen on port 3001....');
            }
        });
    }

});