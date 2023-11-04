import mongoose from 'mongoose';
import { QuestionModel } from '../models/question'
import express, { response } from 'express';

export const getAllQuestions = async (req: express.Request, res: express.Response) => {
    try {
        const questions = await QuestionModel.find();
        if (!questions) { // Query failed
            return res.sendStatus(404).send("questions not found");
        }
        if (questions.length === 0) { // No question found
            return res.sendStatus(204);
        }
        return res.status(200).json(questions);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).send("internal server error");
    }
}

export const getQuestion = async (req: express.Request, res: express.Response) => {
    try {
        const questions = await QuestionModel.find(req.body);

        if (!questions) { // Query failed
            return res.sendStatus(404).send("question not found");
        }
        if (questions.length === 0) { // No question found
            return res.sendStatus(204);
        }
        if (questions.length == 1) {
            return res.status(200).json(questions[0]);
        }

        const randomIndex = Math.floor(Math.random() * questions.length);
        return res.status(200).json(questions[randomIndex]);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500).send("internal server error");
    }
}

export const getFilteredQuestion = async (req: express.Request, res: express.Response) => {
    try {
        console.log(req.query);
        console.log(req.body);
        console.log(req.params.complexity);

        const excludedQuestionId = req.query.id;
        const filteredQuestions = await QuestionModel.find({
            $and: [
                { categories: req.query.categories },
                { complexity: req.query.complexity },
                { id: { $ne: excludedQuestionId } }, // Exclude the specified question ID
            ],
        });

        if (!filteredQuestions) { // Query failed
            return res.sendStatus(404).send("question not found");
        }
        if (filteredQuestions.length === 0) { // No question found
            return res.sendStatus(204);
        }
        if (filteredQuestions.length == 1) {
            return res.status(200).json(filteredQuestions[0]);
        }

        return res.status(200).json(filteredQuestions);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500).send("internal server error");
    }

}

// Get filtered question from question repository
export const getAllFilteredQuestions = async (req: express.Request, res: express.Response) => {
    try {
        console.log(req.query);
        console.log(req.body);
        console.log(req.params.complexity);
        const filteredQuestions = await QuestionModel.find({ categories: req.query.categories, complexity: req.query.complexity });

        if (!filteredQuestions) { // Query failed
            return res.sendStatus(404).send("question not found");
        }
        if (filteredQuestions.length === 0) { // No question found
            return res.sendStatus(204);
        }
        if (filteredQuestions.length == 1) {
            return res.status(200).json(filteredQuestions[0]);
        }

        const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
        return res.status(200).json(filteredQuestions[randomIndex]);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500).send("internal server error");
    }

}


export const addQuestion = async (req: express.Request, res: express.Response) => {
    try {
        const fields = req.body;
        const question = await QuestionModel.create(fields);
        return res.status(201).json(question);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "Duplicate title: A question with this title already exists." });
        }
        console.error(error);
        return res.sendStatus(500).send("internal server error");
    }
}

export const updateQuestion = async (req: express.Request, res: express.Response) => {
    try {
        const fieldsToUpdate = req.body;
        const id = req.params.id;

        delete fieldsToUpdate.id; // Prevent questionID from being updated
        // check for duplicate

        const updatedQuestion = await QuestionModel.findOneAndUpdate(
            { id: id },
            fieldsToUpdate,
            { new: true }
        );

        if (!updatedQuestion) { // Query failed
            return res.sendStatus(404).send("question not found");
        }

        return res.status(200).json(updatedQuestion);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "Duplicate title: A question with this title already exists." });
        }
        console.error(error);
        return res.sendStatus(500).send('internal server error');
    }
}

export const deleteQuestion = async (req: express.Request, res: express.Response) => {
    try {
        // Delete question by questionID, not MongoDB record _id
        const id = req.params.id;
        const deletedQuestion = await QuestionModel.findOneAndDelete({ id: id });
        if (!deletedQuestion) { // Query failed
            return res.sendStatus(404).send('question not found');
        }
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500).send('internal server error');
    }
}

export const getQuestionCount = async (req: express.Request, res: express.Response) => {
    try {
        const questionCount = await QuestionModel.countDocuments();
        return res.status(200).json(questionCount);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500).send("internal server error");
    }
};
