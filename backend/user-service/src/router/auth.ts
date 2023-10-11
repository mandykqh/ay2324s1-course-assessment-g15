import express from 'express';

import { login, signout, check } from '../controllers/auth';

export default (router: express.Router) => {
    router.post('/auth/login', login);
    router.get('/auth/signout', signout);
    router.get('/auth/check', check);
}