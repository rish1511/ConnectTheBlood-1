import express from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import userRoutes from '../modules/user/user.routes.js';
import donorRoutes from '../modules/donor/donor.routes.js';
import bloodBankRoutes from '../modules/bloodBank/bloodBank.routes.js';
import requestRoutes from '../modules/request/request.routes.js';
import bloodRoutes from '../modules/blood/blood.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/donors', donorRoutes);
router.use('/blood-banks', bloodBankRoutes);
router.use('/requests', requestRoutes);
router.use('/blood', bloodRoutes);

export default router;
