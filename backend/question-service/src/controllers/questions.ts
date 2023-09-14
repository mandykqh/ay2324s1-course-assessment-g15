import mongoose from 'mongoose';
import { QuestionModel } from '../models/question'
import express from 'express';

export const getAllQuestions = async (req: express.Request, res: express.Response) => {
    try {
        const question = await QuestionModel.find();
        if (!question) { // Query failed
            return res.sendStatus(404);
        }
        if (question.length === 0) { // No question found
            return res.sendStatus(204);
        }
        return res.status(200).json(question);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const addQuestion = async (req: express.Request, res: express.Response) => {
    try {
        const fields = req.body;
        const question = await QuestionModel.create(fields);
        return res.status(201).json(question);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "Duplicate ID: This ID already exists." });
        }
        console.error(error);
        return res.sendStatus(500);
    }
}

export const updateQuestion = async (req: express.Request, res: express.Response) => {
    try {
        const fieldsToUpdate = req.body;
        const questionID = req.params.questionID;

        // Remove the questionID field from the fieldsToUpdate object
        delete fieldsToUpdate.questionID;

        const updatedQuestion = await QuestionModel.findOneAndUpdate(
            { questionID: questionID },
            fieldsToUpdate,
            { new: true }
        );

        if (!updatedQuestion) { // Query failed
            return res.sendStatus(404);
        }

        return res.status(200).json(updatedQuestion);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export const deleteQuestion = async (req: express.Request, res: express.Response) => {
    try {
        // Delete question by questionID, not MongoDB record _id
        const questionID = req.params.questionID;
        const deletedQuestion = await QuestionModel.findOneAndDelete({ questionID: questionID });
        if (!deletedQuestion) { // Query failed
            return res.sendStatus(404);
        }
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}