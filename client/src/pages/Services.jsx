import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/Services.css';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  const [services, setServices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  let isAdmin = false;
  if (role === "admin") isAdmin = true;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role === "admin") isAdmin = true;
    } catch (e) {
      console.error("Invalid token");
    }
  }

  useEffect(() => {
    axios
      .get("https://final-protfolio.onrender.com/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  const createService = () => {
    axios.post(
      "https://final-protfolio.onrender.com/api/services",
      {
        title: formData.title,
        description: formData.description,
        icon: "/assets/images/webdev.png"
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then(() => {
      setShowAddModal(false);
      window.location.reload();
    })
    .catch((err) => console.error("Create error:", err.response?.data || err));
  };

  const openEditModal = (service) => {
    setCurrentService(service);
    setFormData({ title: service.title, description: service.description });
    setShowEditModal(true);
  };

  const updateService = () => {
    axios.put(
      `https://final-protfolio.onrender.com/api/services/${currentService._id}`,
      {
        title: formData.title,
        description: formData.description,
        icon: currentService.icon
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then(() => {
      setShowEditModal(false);
      window.location.reload();
    })
    .catch((err) => console.error("Update error:", err.response?.data || err));
  };

  const deleteService = (id) => {
    if (!window.confirm("Delete this service?")) return;

    axios.delete(
      `https://final-protfolio.onrender.com/api/services/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then(() => window.location.reload())
    .catch((err) => console.error(err));
  };

  return (
    <div className="services">
      <h1>My Services</h1>

      {isAdmin && (
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          + Add Service
        </button>
      )}

      <div className="service-list">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            isAdmin={isAdmin}
            onEdit={openEditModal}
            onDelete={deleteService}
          />
        ))}
      </div>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Service</h2>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <button onClick={createService}>Save</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Service</h2>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <button onClick={updateService}>Update</button>
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;