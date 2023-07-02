import {Router} from 'express';
import {sendEmail,resetPassword} from '../controllers/mailControllers.js';

const router = Router();

router.post('/sendmail', sendEmail);
router.post('/resetpassword', resetPassword);

export default router;