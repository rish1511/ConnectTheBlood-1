import express from 'express';
import { requestController } from './request.controller.js';

const router = express.Router();
router.get('/', requestController.list);

export default router;
