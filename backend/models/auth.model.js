import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enums: ['admin', 'doctor', 'receptionist', 'nurse', 'pharmacist', 'accountant', 'lab'],
    default: 'doctor'
  }
}, {timestamps: true});

const Auth = mongoose.model('Auth', authSchema);
export default Auth;