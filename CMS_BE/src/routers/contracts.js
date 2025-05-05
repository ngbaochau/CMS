
import express from 'express';
import { updateContractDocument } from '../controllers/contractController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
const router = express.Router();


router.patch(
  '/contracts/:id/document',
  authMiddleware,
  roleMiddleware(['Admin', 'PM']),
  updateContractDocument
);
export default router;
