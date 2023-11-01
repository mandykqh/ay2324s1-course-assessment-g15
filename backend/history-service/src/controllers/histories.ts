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
        const complexity = req.body.data.complexity;
        const easyCount = complexity == 'Easy' ? 1 : 0;
        const mediumCount = complexity == 'Medium' ? 1 : 0;
        const hardCount = complexity == 'Hard' ? 1 : 0;

        console.log(userId, attempt, complexity);

        const entryExist = await HistoryModel.findOne({ userId: userId });
        console.log(entryExist);
        if (!entryExist) {
            await HistoryModel.create({
                userId: userId,
                attempts: [attempt],
                total: 1,
                easy: easyCount,
                medium: mediumCount,
                hard: hardCount,
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

        // update easy, medium, hard counts
        await HistoryModel.findOneAndUpdate(
            { userId: userId },
            { $inc: { easy: easyCount } },
            { new: true }
        );

        await HistoryModel.findOneAndUpdate(
            { userId: req.params.userId },
            { $inc: { medium: mediumCount } },
            { new: true }
        );

        await HistoryModel.findOneAndUpdate(
            { userId: req.params.userId },
            { $inc: { hard: hardCount } },
            { new: true }
        );
    } catch (error) {
        console.error(error);
        return res.sendStatus(500).send("internal server error");
    }
}