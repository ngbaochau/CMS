import axios from './api';

export const updateContractDocument = async (contractId, documentLink) => {
  const response = await axios.patch(`/contracts/${contractId}/document`, {
    document_link: documentLink,
  });
  return response.data;
};
