import Hospital from "../models/hospital.model.js";

export const createHospital = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Hospital.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Hospital already exists with this email" });
    }

    const hospital = await Hospital.create({
      name: String(name).trim(),
      email,
      phone: String(phone).trim(),
      address: String(address).trim(),
    });

    return res.status(201).json({
      message: "Hospital created successfully",
      hospitalId: hospital._id,
      hospital,
    });
  } catch (error) {
    console.log("Error creating hospital:", error);

    if (error.code === 11000) {
      return res.status(409).json({ message: "Hospital already exists" });
    }

    return res.status(500).json({ message: error.message });
  }
};
