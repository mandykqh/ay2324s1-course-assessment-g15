import express from 'express';

import { login, check } from '../controllers/auth';

export default (router: express.Router) => {
    router.post('/auth/login', login);
    router.get('/auth/check', check);
}