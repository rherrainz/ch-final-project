import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  config from "./config.js";
import multer from "multer";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashData = async (data) => {
  return bcrypt.hash(data, 10);
};

export const compareData = async (data, hashedPassword) => {
  return bcrypt.compare(data, hashedPassword);
};

export const generateToken = async (user) => {
  const token = jwt.sign({ user }, config.jwtSecret);
  return token;
};

const storage = multer.diskStorage({
   destination: function(req, file, cb){
      if(file.fieldname === 'profileImage') {
          cb(null,__dirname + '/public/files/profiles')
      } else if(file.fieldname === 'productImage') {
          cb(null, __dirname + '/public/files/products')
      } else if (file.fieldname === 'document') {
          cb(null, __dirname + '/public/files/documents')
      }
  },
  filename: function(req, file, cb){
      cb(null, file.originalname)
  }
});

export const uploader = multer({ storage });
