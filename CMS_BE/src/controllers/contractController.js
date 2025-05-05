
import Contract from '../models/Contracts.js';

export const updateContractDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { document_url } = req.body;

    if (!document_url) {
      return res.status(400).json({ message: 'Document URL is required' });
    }

    const contract = await Contract.findByPk(id);

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    await contract.update({ document_url });

    return res.status(200).json({
      message: 'Document URL updated successfully',
      data: {
        contract_id: contract.contract_id,
        document_url: contract.document_url,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
