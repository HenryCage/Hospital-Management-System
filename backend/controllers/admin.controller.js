import bcrypt from "bcryptjs";
import Auth from "../models/auth.model.js";
import User from "../models/user.model.js";

export const adminSignup = async (req, res) => {
  const { firstname, lastname, email, password, hospitalId } = req.body;

  const existingAdmin = await Auth.findOne({ role: "admin", hospitalId });
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exist" });
  }

  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Auth.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: "admin",
      hospitalId
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        hospitalId: admin.hospitalId,
      }
    });
  } catch (error) {
    console.log('Error in admin creation');
    res.status(500).json({ message: error.message });
  }
}
