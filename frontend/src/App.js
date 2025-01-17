import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your page components
import Todo from './components/Todo';
import Timer from './components/Timer';
import FocusTimeTracker from './components/FocusTimeTracker';


function App() {
    return (
        <Router>
            <div>
                {/* Navigation Bar */}
                <nav className="navbar">
                  <div className="navbar-brand">Job Tracker</div>
                  <ul className="navbar-menu">
                      <li><Link to="/" style={{ marginRight: '10px' }}>Home</Link></li>
                      <li><Link to="/tracker">Focus Time Tracker</Link></li>
                  </ul>
                </nav>

                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<Todo />} />
                    <Route path="/timer" element={<Timer />} />
                    <Route path="/tracker" element={<FocusTimeTracker />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
