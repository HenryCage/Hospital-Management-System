import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../models/auth.model.js";
import User from "../models/user.model.js";

export const adminSignup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const existingAdmin = await Auth.findOne({ role: "admin" });
  if (existingAdmin) {
    res.status(400).json({ message: "Admin already exist" });
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
    });

    res.status(201).json(admin);
  } catch (error) {
    console.log('Error in admin creation');
    res.status(500).json({ message: error.message });
  }
}
