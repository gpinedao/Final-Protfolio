import React, { useState } from 'react';
// Importing useNavigate hook from react-router-dom to programmatically navigate after form submission
import { useNavigate } from 'react-router-dom';
// Importing CSS styles specific to the Contact component
import '../assets/styles/Contact.css';

const Contact = () => {
  // Hook to navigate to another route after form submission
  const navigate = useNavigate();
   // State to store form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  // Function to handle input changes and update formData state
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

   // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior (page reload)
    console.log('Form submitted:', formData);
    navigate('/'); // Redirect to home page after submission
  };

  return (
    <div className="contact-page">
      <h1>Contact Me</h1>

      <div className="contact-info">
        <h2>Contact Information</h2>
        <p><strong>Address:</strong> Niagara Falls, ON, L2G 2Z1</p>
        <p><strong>Phone:</strong> (647) 687-2490</p>
        <p><strong>Email:</strong> e_lizpineda@hotmail.com.com</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Send a Message</h2>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <label>
          Contact Number:
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
        </label>
        <label>
          Email Address:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Contact;