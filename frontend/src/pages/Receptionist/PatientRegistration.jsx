import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientRegistration() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname:"",
    middlename:"",
    email:"",
    phonenumber:"",
    gender:"",
    dob:"",
    address:"",
    emergencycontact:"",
    emergencycontactnumber:"",
    emergencycontactrelationship:"",
    bloodgroup:"",
    genotype:"",
    weight:"",
    height:"",
    allergies: "",
    medicalhistory: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name] : e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token')

      const res = await fetch('http://localhost:3000/patient/create', {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })

      const data = await res.json();

      if(!res.ok) {
        setError(data.message || 'Patient Registration Failed')
        return;
      }

      alert('Patient Registered Successfully');
      setForm({
        firstname: "",
        lastname: "",
        middlename: "",
        email: "",
        phonenumber: "",
        gender: "",
        dob: "",
        address: "",
        emergencycontact: "",
        emergencycontactnumber: "",
        emergencycontactrelationship: "",
        bloodgroup: "",
        genotype: "",
        weight: "",
        height: "",
        allergies: "",
        medicalhistory: ""
      })

      navigate('/rcp')
    } catch (error) {
      setError("Couldn't Register Patient")
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-black mb-6">New Patient Registration</h1>
  
      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}
  
      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">Personal Information</h2>
  
          <div className="grid md:grid-cols-2 gap-4">
            <input name="firstname" placeholder="First Name" className="input" onChange={handleChange} />
            <input name="middlename" placeholder="Middle Name" className="input" onChange={handleChange} />
            <input name="lastname" placeholder="Last Name" className="input" onChange={handleChange} />
  
            <select name="gender" className="input" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
  
            <input type="date" name="dob" className="input" onChange={handleChange} />
          </div>
        </section>
  
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">Contact Details</h2>
  
          <div className="grid md:grid-cols-2 gap-4">
            <input name="phonenumber" placeholder="Phone Number" className="input" onChange={handleChange} />
            <input name="email" placeholder="E-Mail" className="input" onChange={handleChange} />
          </div>
  
          <textarea name="address" placeholder="Home Address" className="input mt-4" rows="3" onChange={handleChange} />
        </section>
  
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">Emergency Contact</h2>
  
          <div className="grid md:grid-cols-2 gap-4">
            <input name="emergencycontact" placeholder="Contact Name" className="input" onChange={handleChange} />
            <input name="emergencycontactrelationship" placeholder="Relationship" className="input" onChange={handleChange} />
            <input name="emergencycontactnumber" placeholder="Phone Number" className="input" onChange={handleChange} />
          </div>
        </section>
  
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">Medical Information</h2>
  
          <div className="grid md:grid-cols-2 gap-4">
            <input name="bloodgroup" placeholder="Blood Group" className="input" onChange={handleChange} />
            <input name="genotype" placeholder="Genotype" className="input" onChange={handleChange} />
            <input name="height" placeholder="Height" className="input" onChange={handleChange} />
            <input name="weight" placeholder="Weight" className="input" onChange={handleChange} />
            <input name="allergies" placeholder="Allergies" className="input" onChange={handleChange} />
            <input name="medicalhistory" placeholder="Medical History" className="input" onChange={handleChange} />
          </div>
        </section>
  
        <div className="flex justify-end gap-4">
          <button type="reset" className="px-6 py-3 border rounded-lg">Clear</button>
          <button type="submit" disabled={loading} className="bg-primary text-white px-8 py-3 rounded-lg font-bold">
            {loading ? 'Registering...' : 'Register Patient'}
          </button>
        </div>
      </form>
    </div>
  )
};
