import express from 'express';
import rooms from './rooms';

const router = express.Router();

export default (): express.Router => {
    rooms(router);
    return router;
}