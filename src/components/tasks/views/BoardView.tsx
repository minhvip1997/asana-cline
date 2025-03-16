import React from 'react';
import { Task, TaskSection as TaskSectionType } from '../../../types/Task';
import TaskSection from '../TaskSection';
import TaskItem from '../TaskItem';

interface BoardViewProps {
  tasks: Task[];
  sections: TaskSectionType[];
  sortBy: 'deadline' | 'priority' | 'none';
  onTaskStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onAddTask: (status: TaskSectionType) => void;
  getSortedTasks: (status: TaskSectionType) => Task[];
}

const BoardView: React.FC<BoardViewProps> = ({
  sections,
  onTaskStatusChange,
  onAddTask,
  getSortedTasks,
}) => {
  return (
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
            onAddTask={onAddTask}
          />
          <div className="task-list">
            {getSortedTasks(status).map((task) => (
              <TaskItem key={task.id} task={task} onStatusChange={onTaskStatusChange} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardView;
