import React, { useState } from 'react';
import { updateContractDocument } from '../services/ContractService';

const UpdateContractDocument = ({ contractId }) => {
  const [documentLink, setDocumentLink] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      const res = await updateContractDocument(contractId, documentLink);
      setMessage(res.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update');
    }
  };

  return (
    <div>
      <h3>Update Document Link</h3>
      <input
        type="text"
        value={documentLink}
        onChange={(e) => setDocumentLink(e.target.value)}
        placeholder="Enter document link"
      />
      <button onClick={handleUpdate}>Update</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateContractDocument;
