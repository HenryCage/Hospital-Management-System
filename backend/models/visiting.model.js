import mongoose from "mongoose";

const visitingSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
    index: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'admitted', 'completed'],
    default: 'pending',
    index: true
  },
  labTests: {type: String, default: ''},
  prescriptions: {type: String, default: ''},
  diagnosis: {type: String, default: ''},
  closedAt: {
    type: Date,
    default: null
  },
  notesHistory: [
    {
      labTests: { type: String, default: "" },
      prescriptions: { type: String, default: "" },
      diagnosis: { type: String, default: "" },
      savedAt: { type: Date, default: Date.now },
      savedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    },
  ]
}, {timestamps: true});

export default mongoose.model('Visiting', visitingSchema);