
import React, { useState } from 'react';
import '../assets/styles/Projects.css'; // Importing the CSS file for styling
// Importing project images
import erDiagram from '../assets/images/project1.png';
import schoolBusImage from '../assets/images/project2.png';
import pacificoImage from '../assets/images/project3.png';

const Projects = () => {
  const [showImage, setShowImage] = useState(null);

   // Function to handle clicking on a thumbnail image
  const handleImageClick = (image) => {
    setShowImage(image);// Set the selected image to be shown in overlay
  };

  // Function to close the image overlay
  const handleClose = () => {
    setShowImage(null);// Reset the image view
  };

  return (
    <div className="projects">
      {/* Section heading */}
      <h1>My Projects</h1>

      {/* Project 1 */}
      <div className="project-card">
        <h2>Project 1: Database Concepts</h2>
        <p><strong>Role:</strong> Team Member</p>
        <p>
          This group project involved designing a relational database for an e-commerce business selling cleaning products.
          We created tables for vendors, products, customers, orders, payments, and more. The system supports queries
          for product search, cart management, vendor updates, and customer segmentation.
        </p>
        <img
          src={erDiagram}
          alt="ER Diagram"
          className="thumbnail"
          onClick={() => handleImageClick(erDiagram)}
        />
      </div>

      {/* Project 2 */}
      <div className="project-card">
        <h2>Project 2: Application for Tracking the School Bus</h2>
        <p><strong>Role:</strong> Team Member</p>
        <p>
          This project focuses on building a real-time school bus tracking system using AI-powered facial recognition and GPS technology.
          It includes mobile and web interfaces for parents, drivers, and administrators, ensuring student safety and efficient transportation.
          Key features include emergency alerts, route customization, and offline operation support.
        </p>
        <img
          src={schoolBusImage}
          alt="School Bus Tracking App"
          className="thumbnail"
          onClick={() => handleImageClick(schoolBusImage)}
        />
      </div>

      {/* Project 3 */}
      <div className="project-card">
        <h2>Project 3: Pacifico Restaurant Website</h2>
        <p><strong>Role:</strong> Web Designer & Developer</p>
        <p>
          Pacifico is a Latin American restaurant website inspired by the Colombian Pacific Coast. The site includes a homepage, full menu, chef bio, and contact information.
          It was built using HTML and CSS, with a focus on storytelling, vibrant design, and user-friendly navigation. The project showcases my ability to create engaging, culturally rich web experiences.
        </p>
         {/* Link to view the live website */}
        <p>
         <a href="/Pacifico/PacificoIndex.html" target='_blank'>View Website</a>
        </p>
        <img
          src={pacificoImage}
          alt="Pacifico Restaurant Website"
          className="thumbnail"
          onClick={() => handleImageClick(pacificoImage)}
        />
      </div>

      {/* Image Overlay */}
      {showImage && (
        <div className="overlay" onClick={handleClose}>
          <img src={showImage} alt="Expanded View" className="full-image" />
        </div>
      )}
    </div>
  );
};

export default Projects;

