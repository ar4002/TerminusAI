import mongoose from 'mongoose';

const promtSchema = new mongoose.Schema({
  role:{
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    
  });
    export const Promt = mongoose.model("Promt", promtSchema);