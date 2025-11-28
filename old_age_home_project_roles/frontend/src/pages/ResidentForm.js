import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResidentForm({ editMode }){
  const [name,setName] = useState('');
  const [age,setAge] = useState('');
  const [medical,setMedical] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(()=>{ if(editMode){ load() } },[]);

  const load = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/residents/' + params.id, { headers: { Authorization: token }});
    setName(res.data.name); setAge(res.data.age); setMedical(res.data.medical);
  };

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = { name, age, medical };
    if(editMode){
      await axios.put('/api/residents/' + params.id, payload, { headers:{ Authorization: token }});
    } else {
      await axios.post('/api/residents', payload, { headers:{ Authorization: token }});
    }
    navigate('/residents');
  };

  return (
    <div className="card" style={{maxWidth:700}}>
      <h2>{editMode ? 'Edit Resident' : 'Add Resident'}</h2>
      <form onSubmit={submit}>
        <div className="form-row">
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
          <input className="input" value={age} onChange={e=>setAge(e.target.value)} placeholder="Age" />
        </div>
        <div className="form-row">
          <textarea className="input" value={medical} onChange={e=>setMedical(e.target.value)} placeholder="Medical notes" />
        </div>
        <div className="form-row">
          <button type="submit">{editMode ? 'Save' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
}
