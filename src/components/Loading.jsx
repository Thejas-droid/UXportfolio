import React from 'react';
import './Loading.css'; // We'll create this next

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="spinner-circle" />
        ))}
      </div>
      <p className="loading-text">Loading Thejas S's portfolio...</p>
    </div>
  );
};

export default Loading;
