import mongoose from 'mongoose'
import User from '../models/user.model.js'
import Patient from '../models/patient.model.js'

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllUsers = async (req, res) => {
  try {
    const staffs = await User.find({ hospitalId: req.user.hospitalId });
    
    res.status(200).json({ staffs });
  } catch (error) {
    console.log('Error in getting all users');
    return res.status(500).json({message: error.message})
  }
}

export const staffCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ hospitalId: req.user.hospitalId });
    res.status(200).json({ count })
  } catch (error) {
    console.log("Error in counting staffs");
    return res.status(500).json({ message: error.message })
  }
}

export const patientCount = async(req, res) => {
  try {
    const count = await Patient.countDocuments();
    res.status(200).json({ count})
  } catch (error) {
    console.log("Error in counting patients");
    return res.status(500).json({ message: error.message })
  }
}
export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid staff ID" });
    }

    const staff = await User.findOne({
      _id: id,
      hospitalId: req.user.hospitalId,
    });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    return res.status(200).json({ staff });
  } catch (error) {
    console.log("Error in getStaffById:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid staff ID" });
    }

    const allowedUpdates = ["firstname", "lastname", "dob", "gender", "department", "phone"];
    const updates = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const staff = await User.findOneAndUpdate(
      { _id: id, hospitalId: req.user.hospitalId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    return res.status(200).json({ message: "Staff updated", staff });
  } catch (error) {
    console.log("Error in updateStaff:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const deleteUserById = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id); // Delete user by ID
    res.status(200).json(deleted); // Return deleted user
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};