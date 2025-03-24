import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import PatientLogin from './pages/PatientLogin';
import PatientSignup from './pages/PatientSignup';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAdmin(adminStatus);
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar isAdmin={isAdmin} isAuthenticated={isAuthenticated} />
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated ? <Home /> : <Navigate to="/patient/login" />} 
            />
            <Route 
              path="/admin" 
              element={isAdmin ? <Admin /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
            <Route 
              path="/patient/login" 
              element={<PatientLogin setIsAuthenticated={setIsAuthenticated} />} 
            />
            <Route path="/patient/signup" element={<PatientSignup />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;