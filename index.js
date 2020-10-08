const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser  = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const UUIDv4 = require('uuid').v4;

const app = express();

const { testDB, syncDB } = require("./database/db");
const router = require('./routes');
const { port } = require('./config');

app.set('trust proxy', 1);

app.use(helmet());
app.use(compression());
app.use(session({
    secret: 'whatever',
    genid() {
        return UUIDv4()
    },
    cookie: {
        maxAge: 360000,
        httpOnly: true,
    }
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

