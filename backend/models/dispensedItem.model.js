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
})

export default mongoose.model('DispensedItem', dispensedItemSchema);