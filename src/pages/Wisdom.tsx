import React, { useState, useEffect } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import "./Wisdom.css";

interface WisdomEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  source?: string;
  dateAdded: string;
}

const wisdomCategories = [
  "Life Philosophy",
  "Creativity",
  "Growth",
  "Relationships", 
  "Success",
  "Mindfulness",
  "Courage",
  "Love"
];

const defaultWisdom = [
  {
    id: "1",
    title: "The Art of Flowing",
    content: "Like water, we must learn to flow around obstacles rather than force our way through them. The most powerful force is often the gentlest.",
    category: "Life Philosophy",
    source: "Ancient Wisdom",
    dateAdded: new Date().toLocaleDateString()
  },
  {
    id: "2", 
    title: "Creative Process",
    content: "Creativity is not about being original, it's about being authentic. Your unique perspective is your greatest gift to the world.",
    category: "Creativity",
    source: "Personal Reflection",
    dateAdded: new Date().toLocaleDateString()
  },
  {
    id: "3",
    title: "Growth Mindset",
    content: "Every challenge is an invitation to grow. The discomfort you feel is your comfort zone expanding.",
    category: "Growth",
    source: "Carol Dweck",
    dateAdded: new Date().toLocaleDateString()
  }
];

export const Wisdom: React.FC = () => {
  const [entries, setEntries] = useState<WisdomEntry[]>(
    loadFromLocalStorage("wisdom-entries", defaultWisdom)
  );
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    category: wisdomCategories[0],
    source: ""
  });

  // Auto-save entries when they change
  useEffect(() => {
    saveToLocalStorage("wisdom-entries", entries);
  }, [entries]);

  function handleSaveEntry() {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;
    
    const entry: WisdomEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      category: newEntry.category,
      source: newEntry.source,
      dateAdded: new Date().toLocaleDateString()
    };
    
    setEntries([entry, ...entries]);
    setNewEntry({ title: "", content: "", category: wisdomCategories[0], source: "" });
    setShowNewEntry(false);
  }

  function handleDeleteEntry(id: string) {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
  }

  const filteredEntries = entries.filter(entry => {
    const matchesCategory = selectedCategory === "All" || entry.category === selectedCategory;
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="wisdom-main">
      <header className="wisdom-header">
        <h1>Wisdom</h1>
        <p className="wisdom-subtitle">
          Collect and reflect on the insights that guide your journey
        </p>
        <button 
          className="new-wisdom-btn" 
          onClick={() => setShowNewEntry(true)}
        >
          ✨ Add Wisdom
        </button>
      </header>

      <div className="wisdom-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search wisdom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="category-filter">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="All">All Categories</option>
            {wisdomCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {showNewEntry && (
        <div className="wisdom-modal">
          <div className="wisdom-modal-content">
            <h2>Add New Wisdom</h2>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                placeholder="What is this wisdom about?"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                placeholder="Share the wisdom..."
                className="form-textarea"
                rows={4}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category:</label>
                <select
                  value={newEntry.category}
                  onChange={(e) => setNewEntry({...newEntry, category: e.target.value})}
                  className="form-select"
                >
                  {wisdomCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Source (optional):</label>
                <input
                  type="text"
                  value={newEntry.source}
                  onChange={(e) => setNewEntry({...newEntry, source: e.target.value})}
                  placeholder="Where did this come from?"
                  className="form-input"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="save-btn" 
                onClick={handleSaveEntry}
                disabled={!newEntry.title.trim() || !newEntry.content.trim()}
              >
                Save Wisdom
              </button>
              <button 
                className="cancel-btn" 
                onClick={() => {
                  setShowNewEntry(false);
                  setNewEntry({ title: "", content: "", category: wisdomCategories[0], source: "" });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="wisdom-entries">
        {filteredEntries.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💡</div>
            <h3>No wisdom found</h3>
            <p>Try adjusting your search or add some wisdom to get started.</p>
          </div>
        ) : (
          filteredEntries.map(entry => (
            <div key={entry.id} className="wisdom-entry">
              <div className="entry-header">
                <div className="entry-meta">
                  <span className="entry-category">{entry.category}</span>
                  <span className="entry-date">{entry.dateAdded}</span>
                </div>
                <button 
                  className="delete-entry-btn"
                  onClick={() => handleDeleteEntry(entry.id)}
                >
                  🗑️
                </button>
              </div>
              <h3 className="entry-title">{entry.title}</h3>
              <p className="entry-content">{entry.content}</p>
              {entry.source && (
                <div className="entry-source">— {entry.source}</div>
              )}
            </div>
          ))
        )}
      </section>
    </main>
  );
};

