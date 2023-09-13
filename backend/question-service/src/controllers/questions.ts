import mongoose from 'mongoose';
import { QuestionModel } from '../models/question'
import express from 'express';

export const getAllQuestions = async (req: express.Request, res: express.Response) => {
    try {
        const users = await QuestionModel.find();
        if (!users) {
            return res.sendStatus(404);
        }
        if (users.length === 0) {
            return res.sendStatus(204);
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}