import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ResidentsList(){
  const [residents, setResidents] = useState([]);
  useEffect(()=>{ fetchList() },[]);
  const fetchList = async ()=> {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/residents', { headers: { Authorization: token } });
    setResidents(res.data);
  };
  const remove = async (id) => {
    if(!window.confirm('Delete resident?')) return;
    const token = localStorage.getItem('token');
    await axios.delete('/api/residents/' + id, { headers: { Authorization: token }});
    fetchList();
  };
  const role = localStorage.getItem('role');
  return (
    <div className="card">
      <h2>Residents</h2>
      <table className="table">
        <thead><tr><th>Name</th><th>Age</th><th>Room</th><th>Actions</th></tr></thead>
        <tbody>
          {residents.map(r=>(
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.age}</td>
              <td>{r.room || '-'}</td>
              <td className="actions">
                {(role==='admin' || role==='staff') && <Link to={'/residents/' + r._id + '/edit'}><button>Edit</button></Link>}
                {(role==='admin' || role==='staff') && <button onClick={()=>remove(r._id)}>Delete</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
