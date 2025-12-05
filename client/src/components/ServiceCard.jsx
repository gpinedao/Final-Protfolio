import React from 'react';
import webDevIcon from '../assets/images/webdev.png';
import backendIcon from '../assets/images/backend.png';
import databaseIcon from '../assets/images/database.png';
import testingIcon from '../assets/images/testing.png';
import financeIcon from '../assets/images/finance.png';

const iconMap = {
  "/assets/images/webdev.png": webDevIcon,
  "/assets/images/backend.png": backendIcon,
  "/assets/images/database.png": databaseIcon,
  "/assets/images/testing.png": testingIcon,
  "/assets/images/finance.png": financeIcon,
};

const ServiceCard = ({ service, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="service-card" data-testid="service-card">
      <img
        src={iconMap[service.icon] || webDevIcon}
        alt={service.title}
      />
      <h2>{service.title}</h2>
      <p>{service.description}</p>

      {isAdmin && (
        <div className="admin-actions">
          <button className="edit-btn" onClick={() => onEdit(service)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDelete(service._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;