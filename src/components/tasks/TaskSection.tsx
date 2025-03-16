import React from 'react';
import { TaskSection as TaskSectionType } from '../../types/Task';

interface TaskSectionProps {
  section: TaskSectionType;
  taskCount: number;
  onAddTask: (section: TaskSectionType) => void;
}

const TaskSection: React.FC<TaskSectionProps> = ({ section, taskCount, onAddTask }) => {
  const getSectionIcon = (): string => {
    switch (section) {
      case 'Todo':
        return 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z';
      case 'In Progress':
        return 'M13 2v2C6.48 4 2 8.48 2 15s4.48 11 11 11 11-4.48 11-11h-2c0 5-4.03 9-9 9s-9-4-9-9 4.03-9 9-9z';
      case 'Done':
        return 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z';
      default:
        return '';
    }
  };

  const getSectionColor = (): string => {
    switch (section) {
      case 'Todo':
        return 'var(--primary-color)';
      case 'In Progress':
        return 'var(--warning-color)';
      case 'Done':
        return 'var(--success-color)';
      default:
        return 'var(--text-secondary)';
    }
  };

  return (
    <div className="task-section">
      <div className="section-header">
        <div className="flex items-center gap-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill={getSectionColor()}>
            <path d={getSectionIcon()} />
          </svg>
          <h2 className="section-title">
            {section} <span className="text-sm text-secondary">({taskCount})</span>
          </h2>
        </div>
        <button className="add-task-button" onClick={() => onAddTask(section)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          <span className="text-sm">Add task</span>
        </button>
      </div>
    </div>
  );
};

export default TaskSection;
