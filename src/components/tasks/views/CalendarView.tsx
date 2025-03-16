import React, { useState } from 'react';
import { Task } from '../../../types/Task';

interface CalendarViewProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, newStatus: Task['status']) => void;
}

type ViewMode = 'day' | 'week' | 'month';

const CalendarView: React.FC<CalendarViewProps> = ({ tasks, onTaskStatusChange }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDateRange = (): Date[] => {
    const dates: Date[] = [];
    const start = new Date(currentDate);

    if (viewMode === 'day') {
      dates.push(new Date(start));
    } else if (viewMode === 'week') {
      // Start from Sunday
      start.setDate(start.getDate() - start.getDay());
      for (let i = 0; i < 7; i++) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
    } else {
      // Month view
      start.setDate(1);
      const month = start.getMonth();
      while (start.getMonth() === month) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
    }
    return dates;
  };

  const getTasksForDate = (date: Date): Task[] => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      );
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: viewMode === 'month' ? 'short' : 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const navigateCalendar = (direction: 'prev' | 'next'): void => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const getNextStatus = (status: Task['status']): Task['status'] => {
    return status === 'Todo' ? 'In Progress' : status === 'In Progress' ? 'Done' : 'Todo';
  };

  return (
    <div className="bg-light rounded-lg p-md">
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-sm">
          {(['day', 'week', 'month'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-sm py-xs rounded-md text-sm ${
                viewMode === mode ? 'bg-primary text-white' : 'text-secondary hover:bg-grey'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-sm">
          <button
            onClick={() => navigateCalendar('prev')}
            className="p-xs rounded-md hover:bg-grey transition-fast"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <span className="font-medium">
            {currentDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button
            onClick={() => navigateCalendar('next')}
            className="p-xs rounded-md hover:bg-grey transition-fast"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`grid gap-sm ${
          viewMode === 'month' ? 'grid-cols-7' : viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-1'
        }`}
      >
        {getDateRange().map((date) => (
          <div key={date.toISOString()} className="bg-white rounded-md p-sm border min-h-[120px]">
            <div className="font-medium mb-sm text-sm">{formatDate(date)}</div>
            <div className="space-y-xs">
              {getTasksForDate(date).map((task) => (
                <div
                  key={task.id}
                  className={`text-xs p-xs rounded flex items-center justify-between gap-sm ${
                    task.priority === 'High'
                      ? 'bg-error-light text-error'
                      : task.priority === 'Medium'
                        ? 'bg-warning-light text-warning'
                        : 'bg-secondary-light text-secondary'
                  }`}
                >
                  <span>{task.title}</span>
                  <button
                    className="opacity-50 hover:opacity-100"
                    onClick={() => onTaskStatusChange(task.id, getNextStatus(task.status))}
                  >
                    {task.status === 'Done' ? '✓' : task.status === 'In Progress' ? '⌛' : '○'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
