import express from 'express';
import histories from './histories';

const router = express.Router();

export default (): express.Router => {
  histories(router);
  return router;
}