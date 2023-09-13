import express from 'express';

import { getAllQuestions, addQuestion, updateQuestion } from '../controllers/questions';

export default (router: express.Router) => {
    router.get('/questions', getAllQuestions);
    router.post('/questions', addQuestion);
    router.patch('/questions/:questionID', updateQuestion);
}