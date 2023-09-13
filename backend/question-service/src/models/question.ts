import mongoose from 'mongoose';
import { complexityEnum, categoryEnum } from './enums';

const QuestionSchema = new mongoose.Schema({
    questionID: {
      type: Number,
      required: true,
      unique: true, // PK
    },
    title: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
      enum: categoryEnum,
    },
    complexity: {
      type: String,
      enum: complexityEnum,
      required: true,
    },
    linkToQuestion: {
      type: String,
      required: true,
    },
    questionDescription: {
      type: String,
      required: true,
    },
  });
  
export const QuestionModel = mongoose.model('Question', QuestionSchema);