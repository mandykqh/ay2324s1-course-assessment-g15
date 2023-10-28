import express from 'express';

import { login, signout, check } from '../controllers/auth';
import { requireAuth, requireCorrectUser } from 'utils/middleware';

export default (router: express.Router) => {
    router.post('/auth/login', login);
    router.get('/auth/signout/:username', requireAuth, requireCorrectUser, signout);
    router.get('/auth/check', check);
}