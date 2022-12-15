const express= require('express');
const mongoose = require('mongoose');
const app= express();
const port=8080;
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/jobdemo', {family: 4}, (err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log('connect to database successfully');
        app.listen(port,()=>{
            console.log("App listening at http://localhost:", port )
        })
    }
})
