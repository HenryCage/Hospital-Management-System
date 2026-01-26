import Visiting from '../models/visiting.model.js'
import mongoose from 'mongoose'

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const startVisit = async (req, res) => {
  try {
    const { patientId } = req.params;

    if(!isValidObjectId(patientId)) {
      return res.status(200).json({ message: 'Invalid patient ID' });
    }

    const openVisit = await Visiting.findOne({ patient: patientId, status: 'pending' }).sort({ createdAt: -1 });
    if (openVisit) {
      return res.status(400).json({ 
        message: 'Patient already has an open visit', 
        visit: openVisit, 
        resumed: true });
    }

    const visit = await Visiting.create({
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
    const pendingVisits = await find({
      status: 'pending',
      closedAt: null
    }).sort({ createdAt: -1 })
      .populate('patient', 'patientId firstname lastname dob gender phone');

    res.status(200).json({ visit: pendingVisits || null });
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

export const getLatestVisit = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!isValidObjectId(patientId)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    const visit = await Visiting.findOne({ patient: patientId })
      .sort({ createdAt: -1 })
      .populate("patient", "patientId firstname lastname dob gender phonenumber");

    res.status(200).json({ visit: visit || null });
  } catch (error) {
    console.error("Error getting latest visit:", error);
    res.status(500).json({ message: "Error getting latest visit" });
  }
};