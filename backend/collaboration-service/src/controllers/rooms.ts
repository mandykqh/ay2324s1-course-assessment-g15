import express from 'express';
import RoomManager from '../types/RoomManager';

// Initialize the room manager, which will handle the creation and deletion of rooms
const roomManager: RoomManager = RoomManager.getInstance();

export const getNewRoomID = async (req: express.Request, res: express.Response) => {
  try {
    let newRoomNumber = roomManager.getNewRoomID();
    // Deprecated
    if (newRoomNumber === -1) {
      return res.status(404).json({ error: 'No available rooms' });
    }
    return res.status(200).json({ roomNumber: newRoomNumber });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};