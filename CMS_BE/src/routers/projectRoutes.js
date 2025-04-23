import express from 'express';
import { updateProjectTrack, getProjectById } from '../controllers/projectController.js';

const router = express.Router();

router.patch('/:id/track', updateProjectTrack);

router.get('/:id', getProjectById);

export default router;
