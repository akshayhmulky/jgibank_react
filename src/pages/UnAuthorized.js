import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnAuthorized = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{}}>
        <div>Sorry You are not authorized to access this page</div>
        <div onClick={() => navigate('/login')}>Go back</div>
      </div>
    </>
  );
};

export default UnAuthorized;
