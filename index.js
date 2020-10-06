const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser  = require('body-parser');
const cookieSession = require('cookie-session');
const compression = require('compression');

const app = express();

const { testDB, syncDB } = require("./database/db");
const router = require('./routes');
const { port } = require('./config');

app.set('trust proxy', 1);

app.use(compression());

app.use(cookieSession({
    name: 'session',
    keys: ['SESSION',],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (req, res) => res.send("Hello World!"));


app.listen(port, () => {
    testDB();
});

