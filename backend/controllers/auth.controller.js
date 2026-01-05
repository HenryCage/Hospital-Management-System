import User from "../models/user.model.js"
import Auth from "../models/auth.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const createStaff = async (req, res) => {
  const { firstname, lastname, dob, gender, department, phone, email, password, role } = req.body;

  if (!firstname || !lastname || !dob || !gender || !department || !phone || !email || !password) {
    return res.status(400).json({message: 'All fields are Required'})
  }

  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'This user already exist' })
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Passwords must be at least 8 characters' })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstname,
      lastname,
      dob,
      gender,
      department,
      phone,
    })
    await user.save();
    
    const userid = user._id;
    const auth = new Auth({
      userId: userid,
      email,
      password: hashedPassword,
      role
    })
    await auth.save();

    return res.status(200).json({ msg: 'User created successfully', user
     })
  } catch (error) {
    console.log('Error in signup controller');
    return res.status(500).json({ msg: error.message})
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({message: 'All fields required'})
    }

    const user = await Auth.findOne({ email });
    
    if (!user) {
      return res.status(400).json({message: 'This user does not exist'})
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({message: 'Invalid login details'})
    }
    
    console.log("LOGIN RESPONSE USER:", User);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('access-token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: 'true',
      path: '/'
    })
    
    const { firstname, lastname, email: userEmail, _id } = user

    return res.status(200).json({
      message: 'Login Successful',
      _id,
      firstname,
      lastname,
      email: userEmail,
      token
    })
  } catch (error) {
    
  }
}