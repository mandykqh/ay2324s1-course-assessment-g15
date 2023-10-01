import express from 'express';
import RoomManager from '../types/RoomManager';

// Initialize the room manager, which will handle the creation and deletion of rooms
const roomManager: RoomManager = RoomManager.getInstance(Number(process.env.ROOMS) || 100);

export const getNewRoomID = async (req: express.Request, res: express.Response) => {
  try {
    let newRoomNumber = roomManager.getNewRoomID();
    if (newRoomNumber === -1) {
      return res.status(404).json({ error: 'No available rooms' });
    }
    return res.status(200).json({ roomNumber: newRoomNumber });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteRoomFromID = async (req: express.Request, res: express.Response) => {
  try {
    let roomNumber = Number(req.params.roomID);
    roomManager.removeRoom(roomNumber);
    return res.status(200).json({ message: `Room ${roomNumber} deleted` });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
