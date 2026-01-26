import mongoose from "mongoose";

const vitalSchema = new mongoose.Schema({
  visit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visiting',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    required: true
  },
  height: {type: Number, default: null},
  weight: {type: Number, default: null},
  systolic: {type: Number, default: null},
  diastolic: {type: Number, default: null},
  temperature: {type: Number, default: null},
  pulseRate: {type: Number, default: null},
}, {timestamps: true});

export default mongoose.model('Vitals', vitalSchema);