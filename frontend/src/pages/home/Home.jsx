import React from "react";
import {Link} from 'react-router-dom'
import './home.css'
function Home() {
  return (
    <div className="home">
      <h2>Welcome to the Learning Resource Manager</h2>
      <p>
        This tool is designed to help you organize, categorize, and search for
        educational resources such as articles, videos, and books. Easily add
        new resources, manage your collection, and enhance your learning
        journey!
      </p>
      <div className="btns">
        <button><Link to='/dashboard'>Dashboard</Link></button>
        <button>Contact sales</button>
      </div>
    </div>
  );
}

export default Home;
