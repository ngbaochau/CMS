import sequelize from '../config/db.js';
import Account from '../models/Accounts.js';

export const updateAccountStatus = async (req, res) => {
  const accountId = req.params.id;
  const { status } = req.body;
  const allowedStatuses = ['contract', 'pending', 'active', 'inactive'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  const sql = 'UPDATE Accounts SET status = ?, updated_at = NOW() WHERE id = ?';

  try {
    const [result] = await sequelize.query(sql, {
      replacements: [status, accountId],
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }

    return res.status(200).json({ message: 'Status updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Database error', details: err });
  }
};

export const getAccountById = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    return res.status(200).json({
      id: account.id,
      company: account.company,
      status: account.status,
      updated_at: account.updated_at,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Database error', details: err });
  }
};
