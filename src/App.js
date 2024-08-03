import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GwaResult from './components/GwaResult.jsx';


function Home() {
  const [subjects, setSubjects] = useState([
    { id: 1, grade: '', units: '' },
    { id: 2, grade: '', units: '' },
    { id: 3, grade: '', units: '' },
    { id: 4, grade: '', units: '' },
    { id: 5, grade: '', units: '' }
  ]);

  const [optionalName, setOptionalName] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (id, field, value) => {
    setSubjects(subjects.map(subject =>
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const addSubject = () => {
    setSubjects([...subjects, { id: subjects.length + 1, grade: '', units: '' }]);
  };

  const calculateGWA = () => {
    let totalUnits = 0;
    let totalWeightedGrades = 0;

    subjects.forEach(subject => {
      const grade = parseFloat(subject.grade);
      const units = parseFloat(subject.units);

      if (!isNaN(grade) && !isNaN(units)) {
        totalUnits += units;
        totalWeightedGrades += grade * units;
      }
    });

    const gwa = totalUnits > 0 ? (totalWeightedGrades / totalUnits).toFixed(2) : 0;
    navigate('/gwa-result', { state: { gwa, optionalName } });
  };

  return (
    <div className="App">
      <div className="Header-Texts">
        <ul>
          <li className="left">Designed by Jay Bombales</li>
        </ul>
      </div>
      <h1>GWA Calculator</h1>
      <div className="Main-Content">
        
        <div className="table-wrapper">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Final Grade</th>
                  <th>Number of Units</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map(subject => (
                  <tr key={subject.id}>
                    <td>{`Subject ${subject.id}`}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Final grade"
                        value={subject.grade}
                        onChange={(e) => handleInputChange(subject.id, 'grade', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="No. of units"
                        value={subject.units}
                        onChange={(e) => handleInputChange(subject.id, 'units', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
                <tr className="footer-row">
                  <td colSpan="3">
                    <label htmlFor="name-input">Name (optional)</label>
                    <input
                      type="text"
                      id="name-input"
                      placeholder="Enter your name"
                      value={optionalName}
                      onChange={(e) => setOptionalName(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="button-container">
          <button className="add-btn" onClick={addSubject}>Add Subject</button>
          <button className="calculate-btn" onClick={calculateGWA}>Calculate GWA</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gwa-result" element={<GwaResult />} />
      </Routes>
    </Router>
  );
}

export default App;
