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
                req.session.user = user.dataValues;
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

export const signout = async (req: express.Request, res: express.Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal server error');
        } else {
            return res.status(200).send('Successfully signed out');
        }
    })
};

export const check = async (req: express.Request, res: express.Response) => {
    console.log(req.session);
    if (req.session.isAuth) {
        return res.status(200).json({ isAuth: true, user: req.session.user });
    } else {
        return res.status(200).json({ isAuth: false });
    }
};
