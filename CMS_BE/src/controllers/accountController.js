import Account from '../models/Accounts.js';
import Project from '../models/Projects.js';

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAccountWithProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const account = await Account.findOne({
      where: { id },
      include: [
        {
          model: Project,
          as: 'projects',
          limit: parseInt(limit),
          offset: parseInt(offset),
          order: [['created_at', 'DESC']],
        },
      ],
    });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const totalProjects = await Project.count({ where: { account_id: id } });

    res.status(200).json({
      account,
      projectsPagination: {
        totalItems: totalProjects,
        totalPages: Math.ceil(totalProjects / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
