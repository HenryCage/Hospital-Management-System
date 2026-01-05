import mongoose from 'mongoose'

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  home_address: {
    type: String,
    required: true
  },
  emergency_contact: {
    type: String,
    required: true
  },
  emergency_contact_number: {
    type: String,
    required: true
  }
})

const Patient = mongoose.model('Patient', patientSchema);
export default Patient