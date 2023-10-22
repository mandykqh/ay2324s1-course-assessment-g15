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
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);
const port = process.env.PORT || 7000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const MONGOURL = process.env.MONGOURL;
console.log(MONGOURL);
mongoose.Promise = Promise;
mongoose.connect(MONGOURL);
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error.');
  process.exit();
});

app.use('/', router());