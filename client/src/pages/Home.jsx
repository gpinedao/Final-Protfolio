
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to My Portfolio</h1>

      <p className="mission">
        Hello! I'm Gladys Pineda Ospina, an ambitious and motivated Software Engineering Technology – AI student at Centennial College with a passion for creating efficient, innovative solutions. This page showcases my skills, projects, and experiences that demonstrate my ability to deliver results in real-world scenarios.

        <br /><br />
        <strong>About Me</strong><br />
        I have a strong foundation in Python, JavaScript, C#, SQL, and web application development. Experienced in both front-end and back-end programming, database management, and the software development lifecycle, with hands-on exposure to multi-tiered architectures, testing, and Agile methods. I enjoy solving challenging problems through creative and practical approaches. My work reflects a commitment to quality, collaboration, and continuous learning.

        <br /><br />
        Feel free to explore my projects and experiences, and don't hesitate to reach out if you'd like to discuss potential opportunities.
      </p>

      {/* Auth buttons */}
      <div className="auth-buttons">
        <Link to="/signup" className="btn primary">Get Started</Link>
        <Link to="/signin" className="btn secondary">I already have an account</Link>
      </div>
    </div>
  );
};

export default Home;