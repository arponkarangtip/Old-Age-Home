import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ResidentsList from './pages/ResidentsList';
import ResidentForm from './pages/ResidentForm';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function Role({ children, allowed }) {
  const role = localStorage.getItem('role');
  if(!allowed.includes(role)) return <div className="card"><h3>Access denied</h3><p>You don't have permission to view this page.</p></div>;
  return children;
}

export default function App() {
  const role = localStorage.getItem('role');
  return (
    <div className="app">
      <header className="topbar">
        <h1>Old Age Home</h1>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/residents">Residents</Link>
          { (role==='admin' || role==='staff') && <Link to="/residents/new">Add Resident</Link> }
          <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); window.location='/login'; }}>Logout</button>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/residents" element={<PrivateRoute><ResidentsList /></PrivateRoute>} />
          <Route path="/residents/new" element={<PrivateRoute><Role allowed={['admin','staff']}><ResidentForm /></Role></PrivateRoute>} />
          <Route path="/residents/:id/edit" element={<PrivateRoute><Role allowed={['admin','staff']}><ResidentForm editMode /></Role></PrivateRoute>} />
        </Routes>
      </main>

      <footer className="footer">© 2025 Old Age Home Management</footer>
    </div>
  );
}
