import express from 'express';
import matchRoute from './matchRoute';

const router = express.Router();

export default (): express.Router => {
    matchRoute(router);
    return router;
}