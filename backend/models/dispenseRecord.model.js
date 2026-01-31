import mongoose from "mongoose";

const dispensedItemSchema = new mongoose.Schema({
  drug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drugs',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  note: {
    type: String
  }
}, {_id: false});

const dispenseRecordSchema = new mongoose.Schema({
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription',
    required: true
  },
  pharmacist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true
  },
  drugs: {
    type: [dispensedItemSchema],
    default: []
  },
  status: {
    type: String,
    enum: ['pending', 'dispensed', 'cancelled'],
    default: 'dispensed'

  },
  timeDispensed: {
    type: Date
  }
}, {timestamps: true});

export default mongoose.model('DispenseRecord', dispenseRecordSchema);