// src/components/ErrorComponent.js
import React from 'react';

const ErrorComponent = ({ message }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
};

export default ErrorComponent;
