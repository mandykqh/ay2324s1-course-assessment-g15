import mongoose from 'mongoose';

// Create a separate counter schema for questionID
const CounterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    default: 0,
  },
});

// Create a model for the counter schema
export const CounterModel = mongoose.model('Counter', CounterSchema);