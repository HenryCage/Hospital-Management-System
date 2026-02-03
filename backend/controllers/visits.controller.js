import mongoose from 'mongoose'
import Visiting from '../models/visiting.model.js'
import Prescription from '../models/prescription.model.js'
import PrescribedItem from "../models/prescribeditem.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const startVisit = async (req, res) => {
  try {
    const { patientId } = req.params;

    if(!isValidObjectId(patientId)) {
      return res.status(200).json({ message: 'Invalid patient ID' });
    }

    const openVisit = await Visiting.findOne({ patient: patientId, closedAt: null }).sort({ createdAt: -1 });
    if (openVisit) {
      return res.status(400).json({ 
        message: 'Patient already has an open visit', 
        visit: openVisit, 
        resumed: true });
    }

    const visit = await Visiting.create({
      hospitalId: req.user.hospitalId,
      patient: patientId,
      createdBy: req.user._id,
      status: 'pending',
      closedAt: null
    });

    return res.status(201).json({ message: 'Visit Started', visit, resumed: false})
  } catch (error) {
    console.error('Error starting visit:', error);
    res.status(500).json({ message: 'Error starting visit' });
  }
}

export const getPendingVisits = async (req, res) => {
  try {
    const pendingVisits = await Visiting.find({
      status: 'pending',
      closedAt: null
    }).sort({ createdAt: -1 })
      .populate('patient', 'patientId firstname lastname dob gender phone');

    res.status(200).json({ visit: pendingVisits });
  } catch (error) {
    console.error('Error getting pending visits:', error);
    res.status(500).json({ message: 'Error getting open sessions' });
  }
}

export const getAVisitbyId = async (req, res) => {
  try {
    const { visitId } = req.params;

    if (!isValidObjectId(visitId)) {
      return res.status(400).json({ message: 'Invalid visit ID' });
    }

    const visit = await Visiting.findById(visitId)
      .populate('patient', 'patientId firstname lastname dob gender phone')
      .populate('createdBy', 'username role');

    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' })
    }

    res.status(200).json({ visit });
  } catch (error) {
    console.error('Error getting visit:', error);
    res.status(500).json({ message: 'Error getting visit' });
  }
}

export const getVisitHistory = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!isValidObjectId(patientId)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    const visit = await Visiting.find({ patient: patientId })
      .sort({ createdAt: -1 })
      .populate("patient", "patientId firstname lastname dob gender phonenumber");

    res.status(200).json({ visit: visit || null });
  } catch (error) {
    console.error("Error getting visit history controller:", error);
    res.status(500).json({ message: "Error getting latest visit" });
  }
};

export const getVisitCounts = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const count = await Visiting.countDocuments(filter);

    return res.status(200).json({ count });
  } catch (error) {
    console.log("Error getting visit count:", error);
    return res.status(500).json({ message: "Error getting visit count" });
  }
};

export const updateVisitStatus = async (req, res) => {
  try {
    const { visitId } = req.params;
    const { status } = req.body;

    if (!isValidObjectId(visitId)) {
      return res.status(400).json({ message: "Invalid visit ID" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const allowed = ["pending", "admitted", "completed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const visit = await Visiting.findById(visitId);
    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    visit.status = status;

    if (status === "completed") {
      visit.closedAt = new Date();
    } else {
      visit.closedAt = null;
    }

    await visit.save();

    return res.status(200).json({ message: "Visit status updated", visit });
  } catch (error) {
    console.log("Error updating visit status:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createPrescription = async (req, res) => {

  try {
    const { patientId, visitId, notes, items } = req.body;

    console.log("BODY:", req.body);
    console.log("PARAMS:", req.params);
    console.log("USER:", req.user?._id);


    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Prescription items required" });
    }

    const prescription = await Prescription.create({
      hospitalId: req.user.hospitalId,
      patient: patientId,
      visit: visitId,
      doctor: req.user._id,
      status: "pending",
      notes
    });

    await PrescribedItem.insertMany(
      items.map(i => ({
        prescription: prescription._id,
        drug: i.drug,
        quantity: i.quantity,
        dosage: i.dosage,
        frequency: i.frequency,
        duration: i.duration
      }))
    );

    res.status(201).json({ message: "Prescription created" });
  } catch (err) {
    console.log("PRESCRIPTION ERROR:", err);
    return res.status(500).json({ message: err.message });
  }

};

export const doctorNotes = async (req, res) => {
  try {
    const { visitId } = req.params;
    const { complaints, labTests, prescriptions, doctorNotes  } = req.body;

    if (!isValidObjectId(visitId)) {
      return res.status(400).json({ message: "Invalid visit ID" });
    }

    const visit = await Visiting.findById(visitId);
    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    const hasExistingNotes =
      (visit.labTests && visit.labTests.trim() !== "") ||
      (visit.prescriptions && visit.prescriptions.trim() !== "") ||
      (visit.diagnosis && visit.diagnosis.trim() !== "");

    if (hasExistingNotes) {
      visit.notesHistory = visit.notesHistory || [];
      visit.notesHistory.push({
        complaints: visit.complaints || "",
        labTests: visit.labTests || "",
        prescriptions: visit.prescriptions || "",
        doctorNotes: visit.doctorNotes || "",
        savedAt: visit.doctorUpdatedAt || new Date(),
        savedBy: visit.doctor || req.user._id,
      });
    }

    visit.complaints = complaints ?? visit.complaints;
    visit.labTests = labTests ?? visit.labTests;
    visit.prescriptions = prescriptions ?? visit.prescriptions;
    visit.doctorNotes = doctorNotes ?? visit.doctorNotes;

    visit.doctor = req.user._id;
    visit.doctorUpdatedAt = new Date();

    await visit.save();

    return res.status(200).json({ message: "Doctor Notes Saved", visit });
  } catch (error) {
    console.log("Error in doctor notes controller");
    return res.status(500).json({ message: error.message });
  }
};

export const getAdmittedVisits = async (req, res) => {
  try {
    const visits = await Visiting.find({
      status: "admitted",
      closedAt: null,
    })
      .sort({ createdAt: -1 })
      .populate("patient", "patientId firstname lastname dob gender phonenumber");

    return res.status(200).json({ visits });
  } catch (error) {
    console.log("Error getting admitted visits:", error);
    return res.status(500).json({ message: "Error getting admitted visits" });
  }
};

export const getAVisitHistory = async (req, res) => {
  try {
    const { visitId } = req.params;

    const visit = await Visiting.findById(visitId)
      .populate("patient")
      .populate("doctor"); // adjust field names to your schema

    if (!visit) return res.status(404).json({ message: "Visit not found" });

    return res.json({ visit, items: [] });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}