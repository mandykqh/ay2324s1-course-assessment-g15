import express from 'express';
import User from '../models/user';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            return res.status(404).send('No user with that Username found.');
        } else {
            if (user.password === req.body.password) {
                req.session.isAuth = true;
                req.session.user = user;
                return res.status(200).json(user);
            } else {
                return res.status(404).send('Incorrect password.');
            }
        }
    } catch (error) {
        console.error('Error getting user:', error);
        return res.status(500).send('Internal server error');
    }
};

export const check = async (req: express.Request, res: express.Response) => {
    if (req.session.isAuth) {
        return res.status(200).json({ isAuth: true, user: req.session.user });
    } else {
        return res.status(404).json({ isAuth: false });
    }
};
