import io from 'socket.io-client';
import { FRONTEND_URL, MATCHING_SERVICE_URL } from '../configs';
import Match from '../models/match/Match';

class MatchingSocketHandler {
    private static socket = io(FRONTEND_URL, {
        path: MATCHING_SERVICE_URL
    });

    static async findMatch(matchData: Match): Promise<void> {
        this.socket.emit('find_match', Object.assign({}, matchData));
    }

    static async cancelMatch(matchData: Match): Promise<void> {
        this.socket.emit('cancel_match', Object.assign({}, matchData));
    }

    public static getSocket() {
        return this.socket;
    }

}

export default MatchingSocketHandler;
