import express from 'express';
import users from './users';
import auth from './auth';

const router = express.Router();

export default (): express.Router => {
    users(router);
    auth(router);
    return router;
}