const express = require('express');
const mongoose = require('mongoose');
const serverConfig = require("./config/serverConfig");
const router = require('./routes/routes');
const app = express();


app.use(express.json());


mongoose.connect('mongodb://localhost/job_portal', {family : 4}, (err) => {
    if(err) {
        console.log(`error occured!`);
    }
    else {
        console.log('Connected!');
        app.listen(serverConfig.PORT, serverConfig.HOST, () => {
            console.log(`Server is listening on ${serverConfig.HOST} : ${serverConfig.PORT}`)
        })
    }
})

app.use(router)

app.get('/', (req, res) => {
    res.send('Welcome the the job portal!')
})