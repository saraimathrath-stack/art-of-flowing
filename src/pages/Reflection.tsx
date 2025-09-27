import React, { useState, useEffect } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import "./Reflection.css";

interface ReflectionEntry {
  id: string;
  date: string;
  title?: string; // Made optional to handle existing entries
  prompt: string;
  response: string;
  mood: string;
}

const reflectionPrompts = [
  "What am I most grateful for today?",
  "What challenge did I face and how did I grow from it?",
  "What would I tell my past self from a week ago?",
  "What am I most proud of accomplishing recently?",
  "What fear am I ready to face?",
  "What brings me the most joy in my daily routine?",
  "What lesson did I learn this week?",
  "How have I shown kindness to myself today?",
  "What dream am I taking steps toward?",
  "What would I do if I knew I couldn't fail?"
];

export const Reflection: React.FC = () => {
  const [entries, setEntries] = useState<ReflectionEntry[]>(() => {
    const savedEntries = loadFromLocalStorage<ReflectionEntry[]>("reflection-entries", []);
    // If we have entries but they don't have titles, add default titles
    return savedEntries.map(entry => ({
      ...entry,
      title: entry.title || "Daily Reflection"
    }));
  });
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState(reflectionPrompts[0]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [currentMood, setCurrentMood] = useState("😊");

  // Auto-save entries when they change
  useEffect(() => {
    saveToLocalStorage("reflection-entries", entries);
  }, [entries]);

  const moods = ["😊", "😌", "🤔", "💪", "😴", "🎉", "😌", "🌟", "💭", "🔥"];

  function handleSaveEntry() {
    if (!currentResponse.trim()) return;
    
    const newEntry: ReflectionEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      title: currentTitle.trim() || "Daily Reflection",
      prompt: currentPrompt,
      response: currentResponse,
      mood: currentMood
    };
    
    setEntries([newEntry, ...entries]);
    setCurrentTitle("");
    setCurrentResponse("");
    setShowNewEntry(false);
  }

  function handleDeleteEntry(id: string) {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
  }

  return (
    <main className="reflection-main">
      <header className="reflection-header">
        <h1>Reflection</h1>
        <p className="reflection-subtitle">
          Take time to pause, reflect, and grow from your experiences
        </p>
        <button 
          className="new-reflection-btn" 
          onClick={() => setShowNewEntry(true)}
        >
          ✨ New Reflection
        </button>
      </header>

      {showNewEntry && (
        <div className="reflection-modal">
          <div className="reflection-modal-content">
            <h2>Daily Reflection</h2>
            
            <div className="title-section">
              <label>Custom Title (optional):</label>
              <input
                type="text"
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                placeholder="Give your reflection a custom title..."
                className="title-input"
              />
            </div>
            
            <div className="prompt-selector">
              <label>Choose a reflection prompt:</label>
              <select 
                value={currentPrompt} 
                onChange={(e) => setCurrentPrompt(e.target.value)}
                className="prompt-select"
              >
                {reflectionPrompts.map((prompt, index) => (
                  <option key={index} value={prompt}>{prompt}</option>
                ))}
              </select>
            </div>
            
            <div className="mood-selector">
              <label>How are you feeling?</label>
              <div className="mood-options">
                {moods.map((mood, index) => (
                  <button
                    key={index}
                    className={`mood-btn ${currentMood === mood ? 'selected' : ''}`}
                    onClick={() => setCurrentMood(mood)}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <div className="response-section">
              <label>Your reflection:</label>
              <textarea
                value={currentResponse}
                onChange={(e) => setCurrentResponse(e.target.value)}
                placeholder="Take your time to reflect deeply..."
                className="reflection-textarea"
                rows={6}
              />
            </div>

            <div className="modal-actions">
              <button 
                className="save-btn" 
                onClick={handleSaveEntry}
                disabled={!currentResponse.trim()}
              >
                Save Reflection
              </button>
              <button 
                className="cancel-btn" 
                onClick={() => {
                  setShowNewEntry(false);
                  setCurrentTitle("");
                  setCurrentResponse("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="reflection-entries">
        {entries.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🌊</div>
            <h3>No reflections yet</h3>
            <p>Start your journey of self-discovery with your first reflection.</p>
            <button 
              className="recover-data-btn"
              onClick={() => {
                // Try to recover any existing data from localStorage
                const allKeys = Object.keys(localStorage);
                const reflectionKeys = allKeys.filter(key => key.includes('reflection'));
                console.log('Found reflection keys:', reflectionKeys);
                
                // Check for any backup data
                reflectionKeys.forEach(key => {
                  try {
                    const data = JSON.parse(localStorage.getItem(key) || '[]');
                    if (Array.isArray(data) && data.length > 0) {
                      console.log(`Found data in ${key}:`, data);
                      setEntries(data.map(entry => ({
                        ...entry,
                        title: entry.title || "Daily Reflection"
                      })));
                    }
                  } catch (e) {
                    console.error(`Error reading ${key}:`, e);
                  }
                });
              }}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: 'rgba(135, 232, 177, 0.2)',
                border: '1px solid rgba(135, 232, 177, 0.4)',
                borderRadius: '8px',
                color: '#E8E8E8',
                cursor: 'pointer'
              }}
            >
              🔄 Try to recover data
            </button>
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="reflection-entry">
              <div className="entry-header">
                <div className="entry-meta">
                  <span className="entry-date">{entry.date}</span>
                  <span className="entry-mood">{entry.mood}</span>
                </div>
                <button 
                  className="delete-entry-btn"
                  onClick={() => handleDeleteEntry(entry.id)}
                >
                  🗑️
                </button>
              </div>
              <div className="entry-title">{entry.title || "Daily Reflection"}</div>
              <div className="entry-prompt">{entry.prompt}</div>
              <div className="entry-response">{entry.response}</div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

