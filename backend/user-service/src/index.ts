import 'dotenv/config'; // Do not standardize, this fixes bug https://stackoverflow.com/questions/62287709/environment-variable-with-dotenv-and-typescript
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import session from 'express-session';
import { sequelize } from './db/dbConfig';
import router from './router';
import cookieParser from 'cookie-parser';

const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

const store = new MongoDBStore({
    uri: process.env.MONGOURL,
    collection: 'sessions',
});

app.use(compression());
app.use(bodyParser.json());

app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "none"
    },
    store: store,
}));

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Initialize sequelize instance
(async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized!');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
})();

app.use('/', router());
