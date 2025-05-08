import Contract from '../models/Contracts.js';

export const updateContractDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { document_link } = req.body;

    if (!document_link) {
      return res.status(400).json({ message: 'Document link is required' });
    }

    const contract = await Contract.findByPk(id);

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    await contract.update({ document_link });

    return res.status(200).json({
      message: 'Document link updated successfully',
      data: {
        contract_id: contract.id,
        document_link: contract.document_link,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
