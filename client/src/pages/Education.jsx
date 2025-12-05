import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Education.css';

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [formData, setFormData] = useState({
    school: '',
    program: '',
    credential: '',
    date: ''
  });

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    school: '',
    program: '',
    credential: '',
    date: ''
  });

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // ✅ Bulletproof admin detection
  let isAdmin = false;

  if (role === "admin") {
    isAdmin = true;
  }

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role === "admin") {
        isAdmin = true;
      }
    } catch (e) {
      console.error("Invalid token");
    }
  }

  // ✅ Load education entries
  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/educations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEducations(res.data);
      } catch (err) {
        console.error('Error fetching educations:', err.response?.data || err.message);
      }
    };

    if (token) fetchEducations();
  }, [token]);

  // ✅ Handle Add Form
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/educations',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEducations([...educations, res.data]);
      setFormData({ school: '', program: '', credential: '', date: '' });
    } catch (err) {
      console.error('Error adding education:', err.response?.data || err.message);
      alert('Failed to add education entry');
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/educations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEducations(educations.filter((e) => e._id !== id));
    } catch (err) {
      console.error('Error deleting education:', err.response?.data || err.message);
      alert('Failed to delete education entry');
    }
  };

 // ✅ Edit Mode
  const startEdit = (education) => {
    setEditId(education._id);
    setEditData({
      school: education.school,
      program: education.program,
      credential: education.credential,
      date: education.date
    });
  };

  const handleEditChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/educations/${id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEducations(educations.map((e) => (e._id === id ? res.data : e)));
      setEditId(null);
    } catch (err) {
      console.error('Error updating education:', err.response?.data || err.message);
      alert('Failed to update education entry');
    }
  };

  return (
    <div className="education">
      <h1>Education</h1>

      {/* ✅ Admin-only Add Form */}
      {isAdmin && (
        <>
          <h2>Add Education</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="School"
              required
            />
            <input
              name="program"
              value={formData.program}
              onChange={handleChange}
              placeholder="Program"
              required
            />
            <input
              name="credential"
              value={formData.credential}
              onChange={handleChange}
              placeholder="Credential"
              required
            />
            <input
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date"
              required
            />
            <button type="submit">Add Education</button>
          </form>
        </>
      )}

      {/* ✅ Education List */}
      {educations.map((e) => (
        <section className="edu-item" key={e._id}>
          {editId === e._id && isAdmin ? (
            <>
              <input
                name="school"
                value={editData.school}
                onChange={handleEditChange}
              />
              <input
                name="program"
                value={editData.program}
                onChange={handleEditChange}
              />
              <input
                name="credential"
                value={editData.credential}
                onChange={handleEditChange}
              />
              <input
                name="date"
                value={editData.date}
                onChange={handleEditChange}
              />

              <button onClick={() => handleUpdate(e._id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{e.school}</h3>
              <p><strong>Program:</strong> {e.program}</p>
              <p><strong>Credential:</strong> {e.credential}</p>
              <p><strong>Date:</strong> {e.date}</p>

              {/* ✅ Admin-only Edit/Delete */}
              {isAdmin && (
                <>
                  <button onClick={() => startEdit(e)}>Edit</button>
                  <button onClick={() => handleDelete(e._id)}>Delete</button>
                </>
              )}
            </>
          )}
        </section>
      ))}
    </div>
  );
};

export default Education;
