import { HistoryModel } from '../models/history'
import express from 'express';

export const getAllHistories = async (req: express.Request, res: express.Response) => {
    try {
        const histories = await HistoryModel.find();
        if (!histories) { // Query failed
            return res.sendStatus(404).send("histories not found");
        }
        if (histories.length === 0) { // No question found
            return res.sendStatus(204);
        }
        return res.status(200).json(histories);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).send("internal server error");
    }
}

export const addHistory = async (req: express.Request, res: express.Response) => {
    try {
        const fields = req.body;
        const question = await HistoryModel.create(fields);
        return res.status(201).json(question);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500).send("internal server error");
    }
}