import express from 'express';

import { createSession } from '../controllers/auth';

export default (router: express.Router) => {
    router.post('/auth/create-session', createSession);
}