import config from '../config.js';
import {transporter} from '../messages/nodemailer.js';
import jwt from 'jsonwebtoken';
import {hashData, compareData} from '../utils.js';
import {UsersManager} from '../services/usersServices.js';

const usersManager = new UsersManager();

const key = config.jwtSecret

export const sendEmail = async (req, res) => {
    const {email} = req.body;
    const user = await usersManager.getUserByEmail(email);
    if (!user) {
        res.status(404).json({message: 'User not found'});
    }
    const token = jwt.sign({email}, key, {expiresIn: '1h'});
    const mailOptions = {
        from: 'YOUR GMAIL ADDRESS',
        to: email,
        subject: 'Reset password',
        html: `<h2>Por favor hacer click en el siguiente enlace para recuperar su contraseña</h2>
        <form action='http://localhost:8080/restablecercontrasena' method='get'>
        <input type='hidden' name='token' value='${token}'/>
        <input type='submit' value='Recuperar contraseña'/>
       </form>`
    }
    try{
        await transporter.sendEmail(mailOptions);
        res.send('Email sent')
    }catch(error){
        res.status(500).json({message: 'Error sending email'});
    }
}

export const resetPassword = async (req, res) => {
    const {token} = req.query;
    const {password,email} = req.body;
    const user = await usersManager.getUserByEmail(email);
    try{
        const decoded = jwt.verify(token, key);
        if (user.length!==0){
            const passwordIsValid = await compareData(password, user.password);
            if (passwordIsValid){
                res.status(400).json({message: 'Password must be different'});
            }else{
                const newPassword = await hashData(password);
                await usersManager.updateUserPassword(email, newPassword);
                res.send('Password updated');
            }
        }else{
            res.status(404).json({message: 'User not found'});
        }
    }catch(error){
        if(error instanceof jwt.TokenExpiredError){
            res.redirect('/expiredtoken')
        } else{
        console.log(error);
        }
    }       
}