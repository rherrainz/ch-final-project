import {dirname} from 'path';
import {fileURLToPath} from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
 }

 export const comparePasswords = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
 }

 export const generateToken = async (user) => {
   const token = jwt.sign({user}, process.env.JWT_SECRET)
   return token;
 };