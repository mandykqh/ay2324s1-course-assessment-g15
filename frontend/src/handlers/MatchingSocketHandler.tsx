import io from 'socket.io-client';
import { MATCHING_SERVICE_URL } from '../configs';
import Match from '../models/match/Match';

class MatchingSocketHandler {
    private static socket = io(MATCHING_SERVICE_URL);

    static async findMatch(matchData: Match): Promise<void> {
        console.log(Object.assign({}, matchData));
        this.socket.emit('find_match', Object.assign({}, matchData));
    }

    static async cancelMatch(matchData: Match): Promise<void> {
        console.log(Object.assign({}, matchData));
        this.socket.emit('cancel_match', Object.assign({}, matchData));
    }

    public static getSocket() {
        return this.socket;
    }

}

export default MatchingSocketHandler;
