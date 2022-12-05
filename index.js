const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.listen(port, () => {
    console.log(`Server is started on port ${port}`)
})