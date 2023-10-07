import { ValidationErrorItem } from "sequelize";
import express from "express";

// Common function to handle Sequelize validation errors
export const handleValidationErrors = (error: any, res: express.Response) => {
    const errorInstance = error.errors[0];
    if (errorInstance instanceof ValidationErrorItem) {
        const validationErrorObject: any = {};
        validationErrorObject.field = errorInstance.path;
        validationErrorObject.message = errorInstance.message;
        return res.status(400).json(validationErrorObject);
    }
    return res.status(500).send('Internal server error');
};