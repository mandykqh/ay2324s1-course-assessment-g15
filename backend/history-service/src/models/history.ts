import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
  },
  attempt: [{
    questionId: { type: Number },
    timestamp: { type: Date }
  }],
});

export const HistoryModel = mongoose.model('History', HistorySchema);
