import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './About';
import Home from './Home';
import TimePage from './TimePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tempos" element={<TimePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
