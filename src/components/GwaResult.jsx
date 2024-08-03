import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GwaResult.css';

function GwaResult() {
  const location = useLocation();
  const { gwa, optionalName } = location.state || { gwa: 0, optionalName: '' };

  let distinction = '';

  if (gwa > 0 && gwa <= 1.45) {
    distinction = "President's Lister";
  } else if (gwa > 1.45 && gwa <= 1.75) {
    distinction = "Dean's Lister";
  }

  return (
    <div className="App">
      <div className="Header-Texts">
        <ul>
          <li className="left">Designed by Jay Bombales</li>
        </ul>
      </div>
      <h1>GWA Result</h1>
      <div className="result-container">
        <h4>Your GWA: {gwa}</h4>
        {optionalName && (
          <h3 className="optional-name">{optionalName}</h3>
        )}
        {distinction && (
          <h3 className="distinction">{distinction}</h3>
        )}
        
      </div>
      <div className="result-container2">
        <h5>The above result is based on Bicol University's criteria for academic distinctions.</h5>
        <div className="list-container">
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><strong>President's Lister :</strong> Students with a GWA of 1 - 1.45 &gt;</li>
            <li><strong>Dean's Lister :</strong> Students with a GWA of 1.45 - 1.75 &gt;</li>
          </ul>
        </div>
      </div>
      <Link to="/">
        <button>Back to Calculator</button>
      </Link>
    </div>
  );
}

export default GwaResult;


