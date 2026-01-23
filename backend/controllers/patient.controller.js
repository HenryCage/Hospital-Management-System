import Patient from "../models/patient.model.js";

export const createPatient = async(req, res) => {
  const {
    firstname,
    lastname,
    middlename,
    email,
    phonenumber,
    gender,
    dob,
    address,
    emergencycontact,
    emergencycontactnumber,
    emergencycontactrelationship,
    bloodgroup,
    genotype,
    weight,
    height,
    allergies,
    medicalhistory
  } = req.body;

  if (!firstname ||
    !lastname ||
    !phonenumber ||
    !gender ||
    !dob ||
    !address ||
    !emergencycontact ||
    !emergencycontactnumber
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const patient = await Patient.create({
      firstname,
      lastname,
      middlename,
      email,
      phonenumber,
      gender,
      dob,
      address,
      emergencycontact,
      emergencycontactnumber,
      emergencycontactrelationship,
      bloodgroup,
      genotype,
      weight,
      height,
      allergies,
      medicalhistory,
      registeredBy: req.user._id,
    });

    res.status(201).json({
      message: "Patient created successfully",
      patient: patient.firstname + ' ' + patient.lastname
    })
  } catch (error) {
    console.log("Error in creating patient");
    return res.status(500).json({ message: error.message });
  }
}

export const getPatientCount = async (req, res) => {
  try {
    const count = await Patient.countDocuments()
    return res.status(200).json({ count })
  } catch (error) {
    console.log("Error in counting Patients");
    return res.status(500).json({ message: error.message })
  }
}

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
    return res.status(200).json({ patients })
  } catch (error) {
    console.log('Error getting all Patients');
    return res.status(500).json({ message: error.message })
  }
}