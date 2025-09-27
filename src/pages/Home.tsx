import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SnapshotCard } from "../components/Cards/SnapshotCard";
import { Logo } from "../components/Logo";
import { useTheme } from "../context/ThemeContext";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import { compressImage } from "../utils/imageUtils";
import { Project } from "./Projects";

export const Home: React.FC = () => {
  const { period } = useTheme();
  const navigate = useNavigate();
  const [logoImage, setLogoImage] = useState<string>(() => {
    // Load logo from localStorage on component mount
    return loadFromLocalStorage<string>("home-logo-image", "");
  });
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = loadFromLocalStorage<Project[]>("projects-list", []);
    setProjects(savedProjects);
  }, []);

  // Save logo to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage("home-logo-image", logoImage);
  }, [logoImage]);

  const handleLogoUpload = (imageUrl: string) => {
    setLogoImage(imageUrl);
  };

  const handleProjectProgressChange = (projectId: string, progress: number) => {
    setProjects(prev => 
      prev.map(p => 
        p.id === projectId 
          ? { ...p, progress: progress, completed: progress >= 100 }
          : p
      )
    );
  };

  const handleProjectsClick = () => {
    navigate('/projects');
  };

  return (
    <main className="home-page animate-stagger">
      {/* Logo Section - Centered with Hover Upload */}
      <div className="logo-section-centered">
        <div className="logo-container-centered">
          {logoImage ? (
            <img src={logoImage} alt="Personal Logo" className="centered-logo" />
          ) : (
            <Logo size="large" showText={true} className="justify-center" />
          )}
          
          {/* Hover overlay for logo change */}
          <div className="logo-hover-overlay">
            <div className="logo-hover-content">
              <label className="logo-upload-btn">
                📷 Change Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        // Compress the image before saving
                        const compressedImage = await compressImage(file, 200, 200, 0.7);
                        setLogoImage(compressedImage);
                      } catch (error) {
                        console.error('Failed to compress image:', error);
                        alert('Image is too large. Please try a smaller image.');
                      }
                    }
                  }}
                  style={{ display: 'none' }}
                />
              </label>
              {logoImage && (
                <button 
                  className="logo-remove-btn"
                  onClick={() => setLogoImage("")}
                >
                  🗑️ Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Centered Greeting */}
      <div className="home-greeting text-center">
        <div className="greeting-content">
          <h1 
            className="text-reveal greeting-title"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "2.3rem",
              fontWeight: 600,
              marginBottom: "0.3rem"
            }}
          >
            Hello, Sarai.
          </h1>
          <div 
            className="text-reveal greeting-subtitle"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.2rem",
              color: "#6c8999",
              marginBottom: "0.3rem"
            }}
          >
            Welcome back to The Art of Flowing
          </div>
          <div 
            className="text-reveal gentle-pulse greeting-motto"
            style={{
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
              fontSize: "1.15rem",
              color: "#88a1b2",
              marginBottom: "0.3rem"
            }}
          >
            Flow in love
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <section className="cards-section">
        <div className="cards-grid">
          <SnapshotCard
            title="Net Worth"
            value="$125,000"
            subtitle="total assets"
            icon="💎"
          />
          <SnapshotCard
            title="Monthly Income"
            value="$5,200"
            subtitle="this month"
            icon="💰"
          />
          <div className="priority-projects-card glass-card clickable-card" onClick={handleProjectsClick}>
            <div className="glass-card-icon">🛠️</div>
            <div className="glass-card-title">Priority Projects</div>
            <div className="projects-list">
              {projects.slice(0, 3).map(project => (
                <div key={project.id} className="project-item">
                  <div className="project-title-section">
                    <span className="project-title">{project.title}</span>
                    {project.completed && <span className="project-completed">✔️</span>}
                  </div>
                  <div className="progress-row">
                    <div className="progress-bar-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-percent">{project.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="no-projects">
                  <span>No projects yet. Click to add one!</span>
                </div>
              )}
            </div>
          </div>
          <div className="motivation-card glass-card">
            <div className="glass-card-icon">✨</div>
            <div className="glass-card-title">Daily Motivation</div>
            <div className="motivation-quote">
              "The way to get started is to quit talking and begin doing."
            </div>
            <div className="motivation-author">— Walt Disney</div>
          </div>
        </div>
      </section>

    </main>
  );
};