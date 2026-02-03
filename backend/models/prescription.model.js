import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  visit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visiting',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'dispensed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String
  }
}, {timestamps: true});

export default mongoose.model('Prescription', prescriptionSchema);