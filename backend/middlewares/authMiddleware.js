import jwt from 'jsonwebtoken'
import Auth from '../models/auth.model.js'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({message: 'Not Authorized'});
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Auth.findById(decoded.id).select('-password');
  
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not Authorized' });
  }
};