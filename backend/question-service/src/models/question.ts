import mongoose from 'mongoose';
import { complexityEnum, categoryEnum } from './enums';
import { CounterModel } from './counter';

const QuestionSchema = new mongoose.Schema({
  questionID: {
    type: Number,
    unique: true, // PK
  },
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  //   validate: {
  //     validator: async function (value: string) {
  //       // Check if a document with the same title (case-insensitive) already exists
  //       const lowerCaseTitle = value.toLowerCase();
  //       const existingQuestion = await this.constructor.findOne({
  //         title: { lowerCaseTitle },
  //       });

  //       // If an existing question is found, it's a duplicate
  //       return !existingQuestion;
  //     },
  //     message: 'Title must be unique (case-insensitive).',
  //   },
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
    trim: true,
  },
  questionDescription: {
    type: String,
    required: true,
    trim: true,
  },
});

// Add a pre-save hook to generate the auto-incremented questionID
// This will increment the questionID counter every time a new question is added
// Failed insertion will also increment the questionID counter
QuestionSchema.pre('save', async function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  try {
    const counter = await CounterModel.findOneAndUpdate(
      { name: 'questionID' },
      { $inc: { value: 1 } },
      { upsert: true, new: true }
    );

    this.questionID = counter.value;
    next();
  } catch (error) {
    next(error);
  }
});

export const QuestionModel = mongoose.model('Question', QuestionSchema);
