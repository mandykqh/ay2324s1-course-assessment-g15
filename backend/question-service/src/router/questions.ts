import express from 'express';

import { getAllQuestions } from '../controllers/questions';

export default (router: express.Router) => {
    router.get('/questions', getAllQuestions);
}