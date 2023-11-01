import express from 'express';

import { getAllQuestions, getQuestion, addQuestion, getAllCategories, updateQuestion, deleteQuestion } from '../controllers/questions';
import { requireAdmin, requireAuth } from '../utils/middleware';

export default (router: express.Router) => {
    router.get('/questions', getAllQuestions);
    router.get('/questions/random', getQuestion);
    router.get('/categories', requireAuth, requireAdmin, getAllCategories);
    router.post('/questions', requireAuth, requireAdmin, addQuestion);
    router.patch('/questions/:id', requireAuth, requireAdmin, updateQuestion);
    router.delete('/questions/:id', requireAuth, requireAdmin, deleteQuestion);
}