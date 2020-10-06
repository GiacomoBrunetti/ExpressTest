const path = require('path')
const express = require('express');

const app = express();

const port = 3000;

const { testDb } = require("./database/db");


app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => res.send("Hello World!"));


app.listen(port, () => {
    testDb();
});

