import 'express-session'
import User from '../models/user';

declare module 'express-session' {
    interface SessionData {
        isAuth: boolean;
        isAdmin: boolean;
        user: User;
    }
}
