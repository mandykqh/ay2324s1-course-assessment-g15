class RoomManager {
    private static instance: RoomManager | null = null; // Singleton

    private numberOfRooms: number;
    private activeRooms: number[];

    constructor(numberOfRooms: number) {
        this.numberOfRooms = numberOfRooms;
        this.activeRooms = [];
    }

    generateRoomNumber() {
        return Math.floor(Math.random() * this.numberOfRooms);
    }

    getNewRoomID() {
        if (this.activeRooms.length === this.numberOfRooms) {
            return -1;
        }
        
        let newRoomNumber;
        do {
            newRoomNumber = this.generateRoomNumber();
        } while (this.activeRooms.includes(newRoomNumber));

        this.activeRooms.push(newRoomNumber);
        return newRoomNumber;
    }

    removeRoom(roomNumber: number) {
        this.activeRooms = this.activeRooms.filter((room) => room !== roomNumber);
    }

    static getInstance(numberOfRooms: number) {
        if (!RoomManager.instance) {
            RoomManager.instance = new RoomManager(numberOfRooms);
        }
        return RoomManager.instance;
    }

    getActiveRooms() {
        return this.activeRooms;
    }

    getNumberOfRooms() {
        return this.numberOfRooms;
    }
}

export default RoomManager;
