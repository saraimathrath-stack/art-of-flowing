import React, { useState } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import "./Manifesto.css";

export const Manifesto: React.FC = () => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState<string>(
    loadFromLocalStorage("manifesto", `I am a creator who flows with intention.

I choose to live with purpose, not perfection.
I embrace the journey of growth and learning.
I trust in my ability to adapt and evolve.

I create from a place of love, not fear.
I share my gifts with the world generously.
I honor my boundaries and respect others'.

I flow like water - flexible yet strong.
I find beauty in the process, not just the outcome.
I celebrate small wins and learn from setbacks.

I am worthy of my dreams.
I am enough, exactly as I am.
I am the author of my own story.

This is my manifesto. This is how I choose to live.`)
  );

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    saveToLocalStorage("manifesto", e.target.value);
  }

  return (
    <main style={{ padding: "2rem 1rem" }}>
      <div className="manifesto-container">
        <h1 className="manifesto-title">My Manifesto</h1>
        <p style={{ 
          textAlign: "center", 
          color: "#6c8999", 
          fontSize: "1.1rem", 
          marginBottom: "2rem",
          fontStyle: "italic"
        }}>
          Your personal declaration of values and intentions
        </p>
        {edit ? (
          <textarea
            className="manifesto-editor"
            value={text}
            onChange={handleChange}
            rows={12}
            placeholder="Write your guiding principles…"
          />
        ) : (
          <div className="manifesto-text">
            {text || <span className="manifesto-placeholder">Write your guiding principles…</span>}
          </div>
        )}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
          <button className="manifesto-edit-btn" onClick={() => setEdit(!edit)}>
            {edit ? "Save Manifesto" : "Edit Manifesto"}
          </button>
          {edit && (
            <button 
              className="manifesto-edit-btn" 
              onClick={() => {
                setText(loadFromLocalStorage("manifesto", ""));
                setEdit(false);
              }}
              style={{ background: "#f0f0f0", color: "#666" }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </main>
  );
};