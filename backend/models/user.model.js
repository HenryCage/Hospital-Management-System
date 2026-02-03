import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },
  staffId: {
    type: String,
    unique: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
}, {timestamps: true});

userSchema.pre("save", function(next) {
  if(!this.staffId) {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 9999);
    this.staffId = `STAFF-${year}-${random}`
  }
  next();
})


const User = mongoose.model('User', userSchema);
export default User