import React from 'react';
import { useNavigate } from 'react-router-dom';

function VerifySuccessPage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ color: 'green' }}>🎉 Account has been verified!</h1>
      <p>You have successfully verified your account..</p>
      <p>Press "OK" to go to the login page.</p>
      <button
        onClick={handleRedirect}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        OK
      </button>
    </div>
  );
}

export default VerifySuccessPage;
