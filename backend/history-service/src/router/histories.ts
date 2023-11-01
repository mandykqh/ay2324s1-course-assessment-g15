import express from 'express';

import { getHistory, addHistory } from '../controllers/histories';

export default (router: express.Router) => {
  router.get('/history/:userId', getHistory);
  router.post('/history', addHistory);
}
