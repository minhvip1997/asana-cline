import React from 'react';
import { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange }) => {
  const handleStatusClick = (): void => {
    // Cycle through statuses: Todo -> In Progress -> Done -> Todo
    const statusOrder: Task['status'][] = ['Todo', 'In Progress', 'Done'];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    onStatusChange(task.id, nextStatus);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getPriorityClass = (priority: Task['priority']): string => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      default:
        return 'priority-low';
    }
  };

  return (
    <div className="task-item">
      <button
        className={`task-status-button w-5 h-5 rounded-sm border flex items-center justify-center ${
          task.status === 'Done'
            ? 'bg-primary border-primary'
            : task.status === 'In Progress'
              ? 'bg-warning-color border-warning-color'
              : 'border-secondary hover:border-primary'
        }`}
        onClick={handleStatusClick}
      >
        {task.status === 'Done' && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        )}
        {task.status === 'In Progress' && <div className="w-2 h-2 rounded-full bg-white" />}
      </button>
      <div className="flex-1 mr-md">
        <h3
          className={`text-sm font-medium mb-xs ${
            task.status === 'Done' ? 'line-through text-secondary' : ''
          }`}
        >
          {task.title}
        </h3>
        <div className="flex items-center gap-sm text-xs text-secondary">
          <span>{task.project}</span>
          {task.dueDate && (
            <>
              <span>•</span>
              <span>{formatDate(task.dueDate)}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-md">
        <span className={`task-priority ${getPriorityClass(task.priority)}`}>{task.priority}</span>
        <button className="p-xs rounded-sm hover-bg-grey transition-fast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-secondary)">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
