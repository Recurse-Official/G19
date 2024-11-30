import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Upload from './components/Upload';
import Scan from './components/Scan';
//import '/styles.css'; // Optional: Include styles

function App() {
  return (
    <Router>
      <div>
        <h1>Image Upload and Download</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Upload Images</Link>
            </li>
            <li>
              <Link to="/scan">Scan and Download</Link>
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/scan" element={<Scan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
