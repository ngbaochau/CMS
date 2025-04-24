import express from 'express';
import { getAllAccounts, getAccountWithProjects } from '../controllers/accountController.js';

const router = express.Router();

router.get('/', getAllAccounts);
router.get('/:id', getAccountWithProjects);

export default router;
