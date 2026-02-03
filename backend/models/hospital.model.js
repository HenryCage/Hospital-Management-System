import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    hospitalCode: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

hospitalSchema.pre("save", async function (next) {
  if (this.hospitalCode) return next();

  const lastHospital = await mongoose
    .model("Hospital")
    .findOne()
    .sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastHospital?.hospitalCode) {
    const lastNum = Number(lastHospital.hospitalCode.split("-")[1]);
    if (!isNaN(lastNum)) nextNumber = lastNum + 1;
  }

  this.hospitalCode = `HOSP-${String(nextNumber).padStart(3, "0")}`;

  next();
});

export default mongoose.model("Hospital", hospitalSchema);
