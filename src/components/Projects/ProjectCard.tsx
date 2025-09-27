import React, { useState, useEffect } from "react";
import { Project } from "../../pages/Projects";
import "./ProjectCard.css";

interface Props {
  project: Project;
  onProgressChange: (id: string, value: number) => void;
  onEditNote: (id: string, note: string) => void;
  onDelete: (id: string) => void;
  onAddTodo: (projectId: string, todoText: string) => void;
  onToggleTodo: (projectId: string, todoId: string) => void;
  onDeleteTodo: (projectId: string, todoId: string) => void;
  onImageUpload: (projectId: string, imageUrl: string) => void;
  onImageRemove: (projectId: string) => void;
  completed?: boolean;
}

export const ProjectCard: React.FC<Props> = ({
  project, onProgressChange, onEditNote, onDelete, onAddTodo, onToggleTodo, onDeleteTodo, onImageUpload, onImageRemove, completed
}) => {
  const [noteEditing, setNoteEditing] = useState(false);
  const [noteText, setNoteText] = useState(project.note || "");
  const [todoText, setTodoText] = useState("");
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [todosCollapsed, setTodosCollapsed] = useState(true);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [buttonFaded, setButtonFaded] = useState(false);

  // Auto-fade the remove button after 10 seconds
  useEffect(() => {
    if (project.image) {
      const timer = setTimeout(() => {
        setButtonFaded(true);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [project.image]);

  function handleProgressSlider(e: React.ChangeEvent<HTMLInputElement>) {
    onProgressChange(project.id, Number(e.target.value));
  }

  function handleQuickProgress(increment: number) {
    let newVal = Math.min(project.progress + increment, 100);
    onProgressChange(project.id, newVal);
  }

  function handleNoteSave() {
    onEditNote(project.id, noteText);
    setNoteEditing(false);
  }

  function handleAddTodoSubmit() {
    if (todoText.trim()) {
      onAddTodo(project.id, todoText);
      setTodoText("");
      setShowAddTodo(false);
    }
  }

  function handleImageSubmit() {
    if (imageUrl.trim()) {
      onImageUpload(project.id, imageUrl.trim());
      setImageUrl("");
      setShowImageUpload(false);
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // Convert file to data URL for preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onImageUpload(project.id, dataUrl);
        setShowImageUpload(false);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleImageRemove() {
    onImageRemove(project.id);
  }

  return (
    <div className={`project-card${completed ? " completed" : ""}`}>
      <div className="project-card-content">
        {/* Left side image banner */}
        <div className="image-banner-left">
          {project.image ? (
            <div className="image-banner-display">
              <img src={project.image} alt="Project" className="project-banner-image" />
              <button 
                className={`remove-image-btn ${buttonFaded ? 'faded' : ''}`} 
                onClick={handleImageRemove}
                onMouseEnter={() => setButtonFaded(false)}
                onMouseLeave={() => setButtonFaded(true)}
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="image-banner-upload">
              {showImageUpload ? (
                <div className="image-upload-form-banner">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="file-input"
                    id={`file-input-${project.id}`}
                  />
                  <label htmlFor={`file-input-${project.id}`} className="file-upload-btn-banner">
                    📁 Choose File
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or enter image URL..."
                    className="image-url-input-banner"
                  />
                  <button onClick={handleImageSubmit} className="image-save-btn">Add URL</button>
                  <button onClick={() => setShowImageUpload(false)} className="image-cancel-btn">Cancel</button>
                </div>
              ) : (
                <button 
                  className="add-image-btn-banner" 
                  onClick={() => setShowImageUpload(true)}
                >
                  📷 Add Banner
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Right side content */}
        <div className="project-content-right">
          <div className="project-main">
            <div className="project-header">
              <div className="project-title-section">
                <span className="project-title">{project.title}</span>
                {completed && <span className="project-completed">✔️</span>}
              </div>
              <button className="delete-btn" onClick={() => onDelete(project.id)}>🗑️</button>
            </div>
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
                   <div className="quick-progress-buttons">
                     <button className="quick-progress-btn" onClick={() => handleQuickProgress(5)}>+5%</button>
                     <button className="quick-progress-btn" onClick={() => handleQuickProgress(10)}>+10%</button>
                   </div>
                 </div>
          
          <div className="note-row">
        {noteEditing ? (
          <>
            <input
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Next step or note…"
              className="note-edit-input"
            />
            <button className="note-save-btn" onClick={handleNoteSave}>Save</button>
            <button className="note-cancel-btn" onClick={() => setNoteEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <span className="note-label">
              {project.note ? (
                <>
                  <span>{project.note}</span>
                  <button className="note-edit-btn" onClick={() => setNoteEditing(true)}>Edit</button>
                </>
              ) : (
                <button className="note-edit-btn" onClick={() => setNoteEditing(true)}>+ Add Note</button>
              )}
            </span>
          </>
        )}
          </div>
          
          {/* Todo Section */}
          <div className="todos-section-above">
        <div className="todos-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ 
              fontSize: "1.2rem", 
              marginRight: "0.5rem",
              opacity: 0.7
            }}>
              📋
            </div>
            <h4 style={{ 
              fontFamily: "Playfair Display, serif", 
              fontSize: "1.1rem", 
              margin: "0",
              color: "var(--text-color)"
            }}>
              Tasks & Todos
            </h4>
            <span style={{ 
              fontSize: "0.8rem", 
              color: "var(--secondary-color, #6c7b7d)",
              fontStyle: "italic"
            }}>
              ({project.todos?.length || 0})
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button
              onClick={() => setTodosCollapsed(!todosCollapsed)}
              className="collapse-todos-btn"
            >
              {todosCollapsed ? "▼" : "▲"}
            </button>
            {!todosCollapsed && (
              <button
                onClick={() => setShowAddTodo(!showAddTodo)}
                className="add-todo-btn"
              >
                {showAddTodo ? "Cancel" : "+ Add Todo"}
              </button>
            )}
          </div>
        </div>
        
        {!todosCollapsed && (
          <>
            {showAddTodo && (
              <div className="add-todo-form">
                <input
                  type="text"
                  value={todoText}
                  onChange={(e) => setTodoText(e.target.value)}
                  placeholder="Enter a new task..."
                  className="todo-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTodoSubmit()}
                  autoFocus
                />
                <button onClick={handleAddTodoSubmit} className="todo-save-btn">
                  Add
                </button>
              </div>
            )}
            
            <div className="todos-list">
              {project.todos && project.todos.length > 0 ? (
                project.todos.map(todo => (
                  <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => onToggleTodo(project.id, todo.id)}
                      className="todo-checkbox"
                    />
                    <span className="todo-text">{todo.text}</span>
                    <button
                      onClick={() => onDeleteTodo(project.id, todo.id)}
                      className="todo-delete-btn"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-todos">
                  <span style={{ color: "var(--secondary-color, #6c7b7d)", fontStyle: "italic" }}>
                    No tasks yet. Add one to get started!
                  </span>
                </div>
              )}
            </div>
          </>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};