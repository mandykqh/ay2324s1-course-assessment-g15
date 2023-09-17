import 'dotenv/config'; // Do not standardize, this fixes bug https://stackoverflow.com/questions/62287709/environment-variable-with-dotenv-and-typescript
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { sequelize } from './db/dbConfig';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());

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