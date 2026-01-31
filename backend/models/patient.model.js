import mongoose from 'mongoose'

const patientSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  middlename: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  emergencycontact: {
    type: String,
    required: true
  },
  emergencycontactemail: {
    type: String
  },
  emergencycontactnumber: {
    type: String,
    required: true
  },
  emergencycontactrelationship: {
    type: String
  },
  bloodgroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true
  },
  genotype: {
    type: String,
    enum: ["AA", "AS", "SS"]
  },
  weight: {
    type: Number
  },
  height: {
    type: Number
  },
  allergies: {
    type: String
  },
  medicalhistory: {
    type: String
  },
  patientId: {
    type: String
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true
  }
}, {timestamps: true});

patientSchema.pre("save", function(next) {
  if(!this.patientId) {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 9000);
    this.patientId = `PAT-${year}-${random}`

    next();
  }
})
export default mongoose.model('Patient', patientSchema);