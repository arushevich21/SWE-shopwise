"use client";
import "./globals.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="container-layout">
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar">
          <h1 className="logo">ShopWise</h1>
          <nav className="nav-links flex items-center">
            <a href="/dashboard">Dashboard</a>
            <a href="#vision">Vision</a>
            <a href="#team">Team</a>
            <a className="flex items-center space-x-2" href="/login">
             <img src="./icons/user-interface.png" alt="User Icon" className="w-5 h-5" /> 
             <span> Sign in</span>
            </a>
          </nav>
        </div>
      </header>

      <div className="hero">
        <div className="hero-inner">
          <h2>Beat the Rising Cost of Living</h2>
          <p>
            ShopWise helps you find the best deals across multiple grocery stores in real-time.
            Save money, shop smarter.
          </p>
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>

      <section id="vision" className="section">
        <div className="section-inner">
          <h3>Our Vision</h3>
          <p>For individuals and families struggling with rising grocery prices...</p>
        </div>
      </section>

      <section id="team" className="section section-alt">
        <div className="section-inner">
          <h3>Team Roles</h3>
          <ul>
            <li><strong>Product Manager:</strong> Anton Rushevich</li>
            <li><strong>Scrum Master:</strong> Jack Lohse</li>
            <li><strong>Front End Developer:</strong> Davis Pham</li>
            <li><strong>Back End Developer:</strong> Kirill Sakharov</li>
          </ul>
        </div>
      </section>

      <div id="tech" className="section">
        <div className="section-inner">
          <h3>Technologies</h3>
          <ul>
            <li>HTML, CSS, JavaScript</li>
            <li>ReactJS, NodeJS, ExpressJS</li>
            <li>MySQL</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
