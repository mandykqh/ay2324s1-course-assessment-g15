import 'express-session'

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'USER';
}

declare module 'express-session' {
    interface SessionData {
        isAuth: boolean;
        user: User;
    }
}
