import express from 'express';

import { getNewRoomID, deleteRoomFromID } from '../controllers/rooms';

export default (router: express.Router) => {
    router.get('/rooms', getNewRoomID);
    router.delete('/rooms/:roomID', deleteRoomFromID);
}