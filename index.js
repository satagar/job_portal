const express = require('express')
const mongoose = require('mongoose')
const EmpHire = express()

mongoose
    .connect(process.env.MONGO_DB_URI, options)
    .then(() => console.log('Connected to DataBase'))
    .catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))