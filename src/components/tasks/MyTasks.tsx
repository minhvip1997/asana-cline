import React, { useState } from 'react';
import { Task, TaskSection as TaskSectionType } from '../../types/Task';
import BoardView from './views/BoardView';
import ListView from './views/ListView';
import CalendarView from './views/CalendarView';
import '../../styles/tasks.css';

type SortType = 'deadline' | 'priority' | 'none';
type ViewMode = 'list' | 'board' | 'calendar';

interface ViewIcons {
  list: string;
  board: string;
  calendar: string;
}

const viewIcons: ViewIcons = {
  list: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z',
  board: 'M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm0 6h4v4H7v-4zm6-6h4v4h-4V7zm0 6h4v4h-4v-4z',
  calendar:
    'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z',
};

const priorityWeight = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const MyTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review project proposal',
      description: 'Review and provide feedback on the new project proposal',
      project: 'Project Planning',
      dueDate: new Date('2025-03-17'),
      priority: 'High',
      status: 'Todo',
    },
    {
      id: '2',
      title: 'Update documentation',
      description: 'Update the API documentation with new endpoints',
      project: 'Documentation',
      dueDate: new Date('2025-03-18'),
      priority: 'Medium',
      status: 'In Progress',
    },
    {
      id: '3',
      title: 'Prepare presentation',
      description: 'Create slides for the team meeting',
      project: 'Team Communication',
      dueDate: new Date('2025-03-20'),
      priority: 'Low',
      status: 'Done',
    },
  ]);

  const sections: TaskSectionType[] = ['Todo', 'In Progress', 'Done'];
  const [sortBy, setSortBy] = useState<SortType>('none');
  const [viewMode, setViewMode] = useState<ViewMode>('board');

  const handleStatusChange = (taskId: string, newStatus: Task['status']): void => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  const handleAddTask = (status: TaskSectionType): void => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'New Task',
      project: 'Inbox',
      dueDate: null,
      priority: 'Medium',
      status,
    };
    setTasks([...tasks, newTask]);
  };

  const getSortedTasks = (status: TaskSectionType): Task[] => {
    const statusTasks = tasks.filter((task) => task.status === status);

    if (sortBy === 'none') return statusTasks;

    return [...statusTasks].sort((a, b) => {
      if (sortBy === 'deadline') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
      } else if (sortBy === 'priority') {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      return 0;
    });
  };

  return (
    <div className="p-lg">
      <div className="mb-xl">
        <div className="flex items-center justify-between mb-md">
          <div className="flex items-center gap-md">
            <h1 className="text-2xl font-medium">My Tasks</h1>
            <div className="flex items-center gap-sm bg-light rounded-lg p-xs">
              {(['list', 'board', 'calendar'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-sm rounded-md transition-fast ${
                    viewMode === mode ? 'bg-primary text-white' : 'text-secondary hover:bg-grey'
                  }`}
                  title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} View`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d={viewIcons[mode]} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-md">
            <div className="flex items-center gap-sm">
              <span className="text-sm text-secondary">Sort by:</span>
              <button
                onClick={() => setSortBy(sortBy === 'deadline' ? 'none' : 'deadline')}
                className={`px-sm py-xs rounded-md text-sm ${
                  sortBy === 'deadline' ? 'bg-primary text-white' : 'text-secondary hover:bg-grey'
                }`}
              >
                Deadline
              </button>
              <button
                onClick={() => setSortBy(sortBy === 'priority' ? 'none' : 'priority')}
                className={`px-sm py-xs rounded-md text-sm ${
                  sortBy === 'priority' ? 'bg-primary text-white' : 'text-secondary hover:bg-grey'
                }`}
              >
                Priority
              </button>
            </div>
            <button className="flex items-center gap-sm p-sm rounded-md bg-primary text-white hover:bg-primary-dark transition-fast">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'board' && (
        <BoardView
          tasks={tasks}
          sections={sections}
          sortBy={sortBy}
          onTaskStatusChange={handleStatusChange}
          onAddTask={handleAddTask}
          getSortedTasks={getSortedTasks}
        />
      )}

      {viewMode === 'list' && (
        <ListView
          tasks={tasks}
          sections={sections}
          sortBy={sortBy}
          onTaskStatusChange={handleStatusChange}
          getSortedTasks={getSortedTasks}
        />
      )}

      {viewMode === 'calendar' && (
        <CalendarView tasks={tasks} onTaskStatusChange={handleStatusChange} />
      )}
    </div>
  );
};

export default MyTasks;
