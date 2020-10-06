const path = require('path');
const express = require('express');
const morgan = require('morgan')

const app = express();

const { db, testDB, syncDB } = require("./database/db");
const router = require('./routes')

const port = 3000;


app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/api', router)

app.get('/', (req, res) => res.send("Hello World!"));



app.listen(port, () => {
    testDB();
    syncDB();
});

