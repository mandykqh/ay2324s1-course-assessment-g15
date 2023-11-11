import { HistoryModel } from '../models/history'
import express from 'express';

export const getHistory = async (req: express.Request, res: express.Response) => {
    try {
        const history = await HistoryModel.findOne({ userId: req.params.userId });
        if (!history) { // Query failed
            return res.status(404).send("histories not found");
        }
        return res.status(200).json(history);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).send("internal server error");
    }
}

export const addHistory = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.body.data.userId;
        const attempt = req.body.data.attempt;

        const entryExist = await HistoryModel.findOne({ userId: userId });
        if (!entryExist) {
            await HistoryModel.create({
                userId: userId,
                attempts: [attempt],
                total: 1,
            })
            return;
        }

        // Update attempts array
        await HistoryModel.findOneAndUpdate(
            { userId: userId },
            { $push: { attempts: attempt } },
            { new: true }
        );

        // Update total
        await HistoryModel.findOneAndUpdate(
            { userId: userId },
            { $inc: { total: 1 } },
            { new: true }
        );

    } catch (error) {
        console.error(error);
        return res.sendStatus(500).send("internal server error");
    }
}