import express from 'express';
import { updateAccountStatus, getAccountById } from '../controllers/accountController.js';

const router = express.Router();

router.put('/:id/status', updateAccountStatus);
router.get('/:id', getAccountById);
export default router;
