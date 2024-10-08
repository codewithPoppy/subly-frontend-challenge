import React from 'react';
import '../styles/ProgressBar.css'; // Import the CSS file

const ProgressBar: React.FC = () => {
  return (
    <div className="progress-container">
      <div className="progress">
        <div className="flow"></div>
      </div>
    </div>
  );
};

export default ProgressBar;