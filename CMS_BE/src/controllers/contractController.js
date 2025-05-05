import Contract from '../models/Contracts.js';
import { body, validationResult } from 'express-validator';

export const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.findAll();
    res.json(contracts);
  } catch {
    res.status(500).json({ error: 'Error fetching contract list' });
  }
};

export const validateContractStatus = [
  body('status')
    .isIn(['Draft', 'WaitingForApproval', 'Signed'])
    .withMessage('Status must be one of: Draft, WaitingForApproval, or Signed'),
];

export const updateContractStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const { status } = req.body;

  try {
    const contract = await Contract.findByPk(id);
    if (!contract) return res.status(404).json({ error: 'Contract not found' });

    contract.status = status;
    contract.updated_at = new Date();
    await contract.save();

    res.json({ message: 'Contract status updated successfully', contract });
  } catch {
    res.status(500).json({ error: 'Error updating contract status' });
  }
};
