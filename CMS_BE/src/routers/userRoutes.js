import express from 'express';
import {
  updateUserById,
  deactivateUserById,
  searchUsers,
  getAllUsers,
} from '../controllers/userController.js';
const router = express.Router();

router.put('/updateUser/:id', updateUserById);
router.put('/deactivateUserById/:id', deactivateUserById);
router.get('/searchUser', searchUsers);
router.get('/getAllUsers', getAllUsers);

export default router;
