import express from 'express';
import questions from './questions';

const router = express.Router();

export default (): express.Router => {
    questions(router);
    return router;
}