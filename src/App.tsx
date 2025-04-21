import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Clubs from './pages/Clubs/Clubs';
import AttendanceTracker from './pages/AttendanceTracker/AttendanceTracker';
import LostFound from './pages/LostFound/LostFound';
import Library from './pages/Library/Library';
import Wellness from './pages/Wellness/Wellness';
import SyllabusTracker from './pages/SyllabusTracker/SyllabusTracker';
import StartupCorner from './pages/StartupCorner/StartupCorner';
import Inventory from './pages/Inventory/Inventory';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute component={Dashboard} />} />
            <Route path="/clubs" element={<ProtectedRoute component={Clubs} />} />
            <Route path="/attendance" element={<ProtectedRoute component={AttendanceTracker} />} />
            <Route path="/lostfound" element={<ProtectedRoute component={LostFound} />} />
            <Route path="/library" element={<ProtectedRoute component={Library} />} />
            <Route path="/wellness" element={<ProtectedRoute component={Wellness} />} />
            <Route path="/syllabus" element={<ProtectedRoute component={SyllabusTracker} />} />
            <Route path="/startup" element={<ProtectedRoute component={StartupCorner} />} />
            <Route path="/inventory" element={<ProtectedRoute component={Inventory} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;