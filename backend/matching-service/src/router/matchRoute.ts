// routers/matchmakingRouter.js
import express from 'express';
import {requestMatch, checkMatch} from '../controllers/matching-controller';

export default (router: express.Router) => {
    router.post('/request_match', requestMatch);
    router.get('/check_match', checkMatch);
}




