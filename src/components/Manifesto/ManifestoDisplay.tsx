import React from "react";
import "./manifesto.css";

interface ManifestoDisplayProps {
  text: string;
  onEdit: () => void;
}

export const ManifestoDisplay: React.FC<ManifestoDisplayProps> = ({ text, onEdit }) => (
  <div className="manifesto-container">
    <h1 className="manifesto-title">My Manifesto</h1>
    <div className="manifesto-text">{text || <span className="manifesto-placeholder">Write your guiding principles…</span>}</div>
    <button className="manifesto-edit-btn" onClick={onEdit}>Edit Manifesto</button>
  </div>
);