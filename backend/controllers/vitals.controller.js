import mongoose from "mongoose";
import Visiting from "../models/visiting.model.js";
import Vitals from "../models/vitals.model.js"

const isValidObject = (id) => mongoose.Types.ObjectId.isValid(id);

export const createVitals = async (req, res) => {
  try {
    const { visitId } = req.params;

    if (!isValidObject(visitId)) {
      return res.status(400).json({message: 'Invalid Visit Id'})
    }

    const existingVisit = await Visiting.findById(visitId) 

    if (!existingVisit) {
      return res.status(400).json({message: 'Visit does not exist'})
    }

    const vitals = await Vitals.create({
      hospitalId: req.user.hospitalId,
      visit: visitId,
      patient: existingVisit.patient,
      recordedBy: req.user._id,
      height: req.body.height,
      weight: req.body.weight,
      systolic: req.body.systolic,
      diastolic: req.body.diastolic,
      temperature: req.body.temperature,
      pulseRate: req.body.pulseRate
    })

    return res.status(201).json({ message: 'Vitals created', vitals })
  } catch (error) {
    console.log('Error in Creating Vitals controller');
    return res.status(500).json({ message: error.message })
  }
} 

export const getVitals = async (req, res) => {
  try {
    const { visitId } = req.params;

    if (!isValidObject(visitId)) {
      return res.status(400).json({message: 'Invalid Visit Id'})
    }

    const vitals = await Vitals.find({ visit: visitId }).sort({ createdAt: -1 });

    return res.status(200).json({ vitals });
  } catch (error) {
    console.log('Error in getting Vitals controller');
    return res.status(500).json({ message: error.message })
  }
}