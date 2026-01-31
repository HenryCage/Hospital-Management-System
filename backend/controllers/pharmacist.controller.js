import mongoose from "mongoose";
import Prescription from "../models/prescription.model.js";
import PrescribedItem from "../models/prescribeditem.js";
import DispenseRecord from "../models/dispenseRecord.model.js"; 


export const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ status: "pending" })
      .populate("patient", "patientId firstname lastname")
      .populate("doctor", "firstname lastname email role")
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (error) {
    console.log('Error in prescription controller');
    res.status(500).json({ message: 'Serrver Error'})
  }
}

export const getAPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient")
      .populate("doctor");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    const items = await PrescribedItem.find({
      prescription: prescription._id
    }).populate("drug");

    res.json({ prescription, items });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}


export const dispensePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    const prescription = await Prescription.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    if (prescription.status !== "pending") {
      return res.status(400).json({ message: "Prescription already processed" });
    }

    // ✅ mark as dispensed (no stock logic)
    prescription.status = "dispensed";
    await prescription.save();

    // ✅ optional: create audit record
    await DispenseRecord.create({
      prescription: prescription._id,
      pharmacist: req.user._id,
      status: "dispensed",
      timeDispensed: new Date(),
      drugs: [] 
    });

    return res.status(200).json({ message: "Dispensed successfully" });
  } catch (err) {
    console.log("Dispense error:", err);
    return res.status(500).json({ message: err.message });
  }
};


export const getDispensedRecords = async (req, res) => {
  try {
    const records = await DispenseRecord.find()
      .populate({
        path: "prescription",
        populate: [
          { path: "patient", "select": "patientId firstname lastname" }, 
          { path: "doctor", "select": "firstname lastname email role" }
        ],
      })
      .populate("pharmacist", "firstname lastname email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({ records });
  } catch (err) {
    console.log("getDispensedRecords error:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const getDispensedRecordById = async (req, res) => {
  try {
    const record = await DispenseRecord.findById(req.params.recordId)
      .populate({
        path: "prescription",
        populate: [{ path: "patient" }, { path: "doctor" }],
      })
      .populate("pharmacist");

    if (!record) return res.status(404).json({ message: "Record not found" });

    return res.status(200).json({ record });
  } catch (err) {
    console.log("getDispensedRecordById error:", err);
    return res.status(500).json({ message: err.message });
  }
};