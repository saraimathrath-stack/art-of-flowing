import React, { useState } from "react";
import { Project } from "../../pages/Projects";
import "./AddProjectModal.css";

interface Props {
  open: boolean;
  onAdd: (project: Project) => void;
  onClose: () => void;
}

export const AddProjectModal: React.FC<Props> = ({ open, onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      id: Date.now().toString(),
      title: title.trim(),
      note: note.trim(),
      progress: 0,
      completed: false,
    });
    setTitle("");
    setNote("");
  }

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Add Project</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Project name"
              required
              autoFocus
            />
          </label>
          <label>
            Note (optional)
            <input
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Goal, next step, etc."
            />
          </label>
          <div className="modal-actions">
            <button type="submit" className="modal-add-btn" disabled={!title.trim()}>Add</button>
            <button type="button" className="modal-cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};