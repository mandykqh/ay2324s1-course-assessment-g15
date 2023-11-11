class RoomManager {
    private static instance: RoomManager | null = null; // Singleton
    private currentRoomNumber: number = 0;

    private constructor() {
        // Private constructor to enforce singleton pattern
    }

    static getInstance() {
        if (!RoomManager.instance) {
            RoomManager.instance = new RoomManager();
        }
        return RoomManager.instance;
    }

    generateRoomNumber() {
        const newRoomNumber = this.currentRoomNumber;
        this.currentRoomNumber = (this.currentRoomNumber + 1) % Number.MAX_SAFE_INTEGER;
        return newRoomNumber;
    }

    getNewRoomID() {
        const newRoomNumber = this.generateRoomNumber();
        return newRoomNumber;
    }

    getNumberOfRooms() {
        // There is no limit on the number of rooms
        return Infinity;
    }
}

export default RoomManager;
