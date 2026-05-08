import express from 'express';
import { bloodBankController } from './bloodBank.controller.js';

const router = express.Router();
router.get('/', bloodBankController.list);

export default router;
