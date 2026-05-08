import express from 'express';
import { donorController } from './donor.controller.js';

const router = express.Router();
router.get('/', donorController.list);

export default router;
