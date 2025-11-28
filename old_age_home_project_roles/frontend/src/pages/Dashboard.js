import React from 'react';

export default function Dashboard(){
  const role = localStorage.getItem('role') || 'unknown';
  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p>Welcome to the Old Age Home Management System.</p>
      <p>Your role: <strong>{role}</strong></p>
    </div>
  );
}
