import mongoose from "mongoose";

const visitingSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
    index: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
    index: true
  },
  closedAt: {
    type: Date,
    default: null
  }
}, {timestamps: true});

export default mongoose.model('Visiting', visitingSchema);