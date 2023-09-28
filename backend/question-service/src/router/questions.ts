import express from 'express';

import { getAllQuestions, addQuestion, updateQuestion, deleteQuestion } from '../controllers/questions';

export default (router: express.Router) => {
    router.get('/questions', getAllQuestions);
    router.post('/questions', addQuestion);
    router.patch('/questions/:id', updateQuestion);
    router.delete('/questions/:id', deleteQuestion);
}