import express from 'express';
import { getAllQuestions, addQuestion, updateQuestion, deleteQuestion, getQuestionCount, getFilteredQuestion, getRandomFilteredQuestion, getAllFilteredQuestions } from '../controllers/questions';
import { requireAdmin, requireAuth } from '../utils/middleware';

export default (router: express.Router) => {
    router.get('/questions', requireAuth, getAllQuestions);
    router.get('/questions/filtered', getFilteredQuestion);
    router.get('/questions/randomfiltered', getRandomFilteredQuestion);
    router.get('/questions/allfiltered', getAllFilteredQuestions);
    router.get('/questions/count', requireAuth, getQuestionCount);
    router.post('/questions', requireAuth, requireAdmin, addQuestion);
    router.patch('/questions/:id', requireAuth, requireAdmin, updateQuestion);
    router.delete('/questions/:id', requireAuth, requireAdmin, deleteQuestion);
}