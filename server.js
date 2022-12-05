const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", ()=>{
    console.log("!! Error connecting to mongoDB !!");
});
db.once("open",()=>{
    console.log("## Connected to mongoDB ##");
    init();
});

app.listen(serverConfig.PORT,()=>{
    console.log(`## connected to server at port no.: ${serverConfig.PORT} ##`);
})