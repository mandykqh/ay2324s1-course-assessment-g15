import express from 'express';

export const createSession = async (req: express.Request, res: express.Response) => {
    try {
        req.session.userId = req.body.userId;
        return res.status(200).json(req.session);
    } catch (error) {
        console.error('Error creating session', error);
        return res.status(500).send('Internal server error');
    }
};