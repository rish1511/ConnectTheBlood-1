import express from 'express';
import { bloodController } from './blood.controller.js';

const router = express.Router();
router.get('/search', bloodController.search);

export default router;
