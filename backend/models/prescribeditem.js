import mongoose from "mongoose";

const prescribedItem = new mongoose.Schema({
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription',
    required: true
  },
  drug: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
}, {timestamps: true});

export default mongoose.model('PrescribedItem', prescribedItem);