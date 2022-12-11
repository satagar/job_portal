const express = require('express');
const { HOST, PORT, ENV } = require('./config/server');
const { dbConnect } = require('./helpers');
const masterRouter = require('./routers');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(masterRouter);

dbConnect();

app.listen(PORT, () => {
    process.stdout.write(`Server started at ${HOST}:${PORT} (${ENV})\n`);
});

module.exports = {
    app
};