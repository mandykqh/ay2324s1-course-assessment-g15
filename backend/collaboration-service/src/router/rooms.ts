import express from 'express';

import { getNewRoomID } from '../controllers/rooms';

export default (router: express.Router) => {
    router.get('/rooms', getNewRoomID);
}