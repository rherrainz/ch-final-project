import {Router} from 'express';
import {sendMail,resetPassword} from '../controllers/mailController.js';

const router = Router();

router.post('/sendmail', sendMail);
router.post('/resetpassword', resetPassword);

export default router;