import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const { SECRETJWT } = process.env;

export const authMiddleware = (roles) => {
  return (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1]; 
    
    if (!token && req.cookies) {
      token = req.cookies.token; 
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, SECRETJWT);
      req.user = decoded.user;
      
      if (roles && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
};