import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [msg,setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      window.location = '/';
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="card" style={{maxWidth:420, margin:'20px auto'}}>
      <h2>Login</h2>
      {msg && <div style={{color:'red'}}>{msg}</div>}
      <form onSubmit={submit}>
        <div className="form-row">
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        </div>
        <div className="form-row">
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        </div>
        <div className="form-row">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
