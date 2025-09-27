import React, { useState, useEffect } from "react";
import { ProjectCard } from "../components/Projects/ProjectCard";
import { AddProjectModal } from "../components/Projects/AddProjectModal";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import "./Projects.css";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  note?: string;
  progress: number; // 0-100
  completed?: boolean;
  todos?: Todo[];
  image?: string;
}

const LS_KEY = "projects-list";

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(
    loadFromLocalStorage<Project[]>(LS_KEY, [
      {
        id: "1",
        title: "Website Redesign",
        note: "Focus on mobile responsiveness and user experience",
        progress: 40,
        completed: false
      },
      {
        id: "2", 
        title: "Poetry Book",
        note: "Final editing and cover design",
        progress: 90,
        completed: false
      }
    ])
  );
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    saveToLocalStorage(LS_KEY, projects);
  }, [projects]);

  function handleAddProject(newProject: Project) {
    setProjects([...projects, newProject]);
    setShowModal(false);
  }

  function handleProgressChange(id: string, value: number) {
    setProjects(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, progress: value, completed: value >= 100 }
          : p
      )
    );
  }

  function handleEditNote(id: string, note: string) {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, note } : p));
  }

  function handleDelete(id: string) {
    setProjects(prev => prev.filter(p => p.id !== id));
  }

  function handleAddTodo(projectId: string, todoText: string) {
    if (!todoText.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: todoText.trim(),
      completed: false
    };
    
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, todos: [...(p.todos || []), newTodo] }
        : p
    ));
  }

  function handleToggleTodo(projectId: string, todoId: string) {
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { 
            ...p, 
            todos: (p.todos || []).map(t => 
              t.id === todoId ? { ...t, completed: !t.completed } : t
            )
          }
        : p
    ));
  }

  function handleDeleteTodo(projectId: string, todoId: string) {
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { 
            ...p, 
            todos: (p.todos || []).filter(t => t.id !== todoId)
          }
        : p
    ));
  }

  function handleImageUpload(projectId: string, imageUrl: string) {
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, image: imageUrl }
        : p
    ));
  }

  function handleImageRemove(projectId: string) {
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, image: undefined }
        : p
    ));
  }

  const activeProjects = projects.filter(p => !p.completed);
  const completedProjects = projects.filter(p => p.completed);
  const totalProgress = activeProjects.length > 0 
    ? Math.round(activeProjects.reduce((sum, p) => sum + p.progress, 0) / activeProjects.length)
    : 0;

  const getFilteredProjects = () => {
    switch (filter) {
      case "active": return activeProjects;
      case "completed": return completedProjects;
      default: return projects;
    }
  };

  return (
    <main className="projects-main">
      <header className="projects-header">
        <div>
          <h1>Projects</h1>
          <div className="projects-prompt">
            Push one project forward – even a 1% progress is progress.
          </div>
          {activeProjects.length > 0 && (
            <div className="progress-summary">
              <span>Overall Progress: {totalProgress}%</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${totalProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <button className="add-project-btn" onClick={() => setShowModal(true)}>
          ➕ Add Project
        </button>
      </header>
      
      <div className="projects-filters">
        <button 
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({projects.length})
        </button>
        <button 
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active ({activeProjects.length})
        </button>
        <button 
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed ({completedProjects.length})
        </button>
      </div>
      <section className="projects-list">
        {getFilteredProjects().length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🌊</div>
            <div>
              {filter === "active" && "No active projects yet. Add one to start flowing!"}
              {filter === "completed" && "No completed projects yet. Keep pushing forward!"}
              {filter === "all" && "No projects yet. Add one to start flowing!"}
            </div>
          </div>
        ) : (
          getFilteredProjects().map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              onProgressChange={handleProgressChange}
              onEditNote={handleEditNote}
              onDelete={handleDelete}
              onAddTodo={handleAddTodo}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              completed={p.completed}
            />
          ))
        )}
      </section>
      <AddProjectModal
        open={showModal}
        onAdd={handleAddProject}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
};