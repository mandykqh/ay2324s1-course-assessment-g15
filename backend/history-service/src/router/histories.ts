import express from 'express';

import { getAllHistories, addHistory } from '../controllers/histories';

export default (router: express.Router) => {
  router.get('/histories', getAllHistories);
  router.post('/histories', addHistory);
}
