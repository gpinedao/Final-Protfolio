
import React from 'react';
import profileImg from '../assets/images/profile.jpg'; // Importing a profile image from the assets folder
import '../assets/styles/About.css'; // Importing CSS styles specific to the About component

// Functional component definition for the About section
const About = () => {
  return (
    <div className="about">
      {/* Displaying the profile image with alt text for accessibility */}
      <img src={profileImg} alt="Gladys Pineda Ospina" className="profile-img" />
      <h1>Gladys Pineda Ospina</h1>
      <p>
        I am a dedicated web developer with a strong passion for designing and building modern, responsive, and user-friendly web applications.
        I enjoy continuously learning and exploring new technologies, frameworks, and best practices to stay up to date in the ever-evolving world of web development. Beyond writing code, I love turning ideas into functional projects that solve real-world problems and add meaningful value to people’s lives.
        Whether it’s front-end development, back-end logic, or full-stack projects, I thrive on tackling challenges, collaborating with others, and pushing myself to improve with every project I build.
      </p>

      <p style={{ color: "#0077cc", fontWeight: "bold" }}>
  This paragraph was added to demonstrate CI/CD deployment using GitHub and Render.
</p>
      
{/* Link to view the resume PDF, opens in a new tab securely */}
<a href={`${process.env.PUBLIC_URL}/resume.pdf`} target="_blank" rel="noopener noreferrer">
  View Resume
</a>

    </div>
  );
};

export default About;




