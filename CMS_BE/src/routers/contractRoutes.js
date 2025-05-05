import express from 'express';
import {
  getAllContracts,
  updateContractStatus,
  validateContractStatus,
} from '../controllers/contractController.js';

const router = express.Router();

router.get('/', getAllContracts);

router.patch('/:id/status', validateContractStatus, updateContractStatus);

export default router;
