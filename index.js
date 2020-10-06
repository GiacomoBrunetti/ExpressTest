const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser  = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();

const { testDB, syncDB, checkUser } = require("./database/db");
const router = require('./routes');
const { port } = require('./config');

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (req, res) => res.send("Hello World!"));



app.listen(port, () => {
    testDB();
    syncDB();
});

