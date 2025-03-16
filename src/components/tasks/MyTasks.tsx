import React, { useState } from 'react';
import { Task, TaskSection as TaskSectionType } from '../../types/Task';
import TaskSection from './TaskSection';
import TaskItem from './TaskItem';
import '../../styles/tasks.css';

type SortType = 'deadline' | 'priority' | 'none';

const priorityWeight = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const MyTasks: React.FC = () => {
  // Sample initial tasks
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
          <h1 className="text-2xl font-medium">My Tasks</h1>
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

      <div className="grid grid-cols-3 gap-lg">
        {sections.map((status) => (
          <div
            key={status}
            className={`flex-1 ${
              status === 'Todo'
                ? 'todo-column'
                : status === 'In Progress'
                  ? 'progress-column'
                  : 'done-column'
            }`}
          >
            <TaskSection
              section={status}
              taskCount={getSortedTasks(status).length}
              onAddTask={handleAddTask}
            />
            <div className="task-list">
              {getSortedTasks(status).map((task) => (
                <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
