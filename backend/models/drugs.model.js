import mongoose from 'mongoose'

const drugSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dose: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['tablet', 'capsule', 'injection', 'syrup', 'drip', 'others'],
    default: 'others'
  },
  barcode: {
    type: String,
    unique: true
  },
  expDate: Date,
  unitPrice: {
    type: Number,
    required: true
  },
  stockQty: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {timestamps: true})

export default mongoose.model('Drugs', drugSchema)