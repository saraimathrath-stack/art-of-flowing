import React, { useState } from "react";
import "./SnapshotCard.css";

interface SnapshotCardProps {
  title: string;
  value: string | React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  image?: string;
  progress?: number;
  onImageUpload?: (imageUrl: string) => void;
  onProgressChange?: (progress: number) => void;
  showUpload?: boolean;
  showProgress?: boolean;
}

export const SnapshotCard: React.FC<SnapshotCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  image,
  progress = 0,
  onImageUpload,
  onProgressChange,
  showUpload = false,
  showProgress = false
}) => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageSubmit = () => {
    if (imageUrl.trim() && onImageUpload) {
      onImageUpload(imageUrl.trim());
      setImageUrl("");
      setShowImageUpload(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result && onImageUpload) {
          onImageUpload(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onProgressChange) {
      onProgressChange(Number(e.target.value));
    }
  };

  return (
    <div className="glass-card snapshot-card">
      {/* Image section */}
      {image && (
        <div className="card-image-section">
          <img src={image} alt={title} className="card-image" />
          <button 
            className="remove-image-btn"
            onClick={() => onImageUpload && onImageUpload("")}
            title="Remove image"
          >
            ✕
          </button>
        </div>
      )}
      
      {/* Upload section */}
      {showUpload && !image && (
        <div className="card-upload-section">
          {!showImageUpload ? (
            <button 
              className="upload-btn"
              onClick={() => setShowImageUpload(true)}
            >
              📷 Upload Logo
            </button>
          ) : (
            <div className="upload-form">
              <input
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="upload-input"
              />
              <div className="upload-actions">
                <button onClick={handleImageSubmit} className="upload-submit">✓</button>
                <button onClick={() => setShowImageUpload(false)} className="upload-cancel">✕</button>
              </div>
            </div>
          )}
          
          {/* File upload */}
          <label className="file-upload-label">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="file-upload-input"
            />
            📁 Choose File
          </label>
        </div>
      )}

      {/* Icon */}
      {icon && <div className="glass-card-icon">{icon}</div>}
      
      {/* Title */}
      <div className="glass-card-title">{title}</div>
      
      {/* Value */}
      <div className="glass-card-value">{value}</div>
      
      {/* Progress bar */}
      {showProgress && (
        <div className="card-progress-section">
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-percent">{progress}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="progress-slider"
          />
        </div>
      )}
      
      {/* Subtitle */}
      {subtitle && <div className="glass-card-subtitle">{subtitle}</div>}
    </div>
  );
};