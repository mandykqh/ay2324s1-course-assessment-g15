import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router'

dotenv.config();
const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);
const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log('Server listening on port 8080');
});

const MONGOURL = process.env.MONGOURL;

mongoose.Promise = Promise;
mongoose.connect(MONGOURL);
mongoose.connection.on('error', () => {
    console.log('MongoDB connection error.');
    process.exit();
});

app.use('/', router());