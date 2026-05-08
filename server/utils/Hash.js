import bcrypt from 'bcryptjs';
import { bcryptConfig } from '../configs/App.js';
 
export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, bcryptConfig.saltRounds);
};
 
export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};