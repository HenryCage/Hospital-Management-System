import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    gender: '',
    phone: '',
    department: '',
    role: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:3000/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          dob: form.dob,
          gender: form.gender,
          phone: form.phone,
          department: form.department,
          role: form.role,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert('Signup successful');
      console.log(data);

    } catch (error) {
      console.log('Error in signup: ' + error)
      alert('Failed to create account')
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1a2634] rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-black mb-2">Create Staff Account</h1>
        <p className="text-sm text-[#617589] mb-6">
          Register a new staff member
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              name='firstname'
              placeholder="First Name"
              onChange={handleChange}
              className="input"
            />

            <input
              name='lastname'
              placeholder="Last Name"
              onChange={handleChange}
              className="input"
            />
          </div>

          <input
              name='dob'
              type="Date"
              placeholder="Date of Birth"
              onChange={handleChange}
              className="input"
          />

          <select name="gender" onChange={handleChange} className="input">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
              name='phone'
              placeholder="Phone"
              onChange={handleChange}
              className="input"
          />

          <input
              name='department'
              placeholder="Department"
              onChange={handleChange}
              className="input"
          />

          <select name="role" onChange={handleChange} className="input">
            <option value=''>Select Role</option>
            <option value='receptionist'>Receptionist</option>
            <option value='admin'>Admin</option>
            <option value='doctor'>Doctor</option>
            <option value='nurse'>Nurse</option>
            <option value='pharmacist'>Pharmacist</option>
            <option value='accountant'>Accountant</option>
            <option value='lab'>Lab</option>
          </select>

          <input
              name='email'
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="input"
          />

          <input
              name='password'
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="input"
          />

          <input
              name='confirmPassword'
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="input"
          />

          <button onClick={() => navigate('/admin/dashboard')}className="bg-primary text-white h-12 rounded-lg font-bold mt-2 hover:bg-blue-600 transition" >
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}