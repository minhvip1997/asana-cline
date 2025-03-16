import React from 'react';
import { Task, TaskSection as TaskSectionType } from '../../../types/Task';
import TaskItem from '../TaskItem';

interface ListViewProps {
  tasks: Task[];
  sections: TaskSectionType[];
  sortBy: 'deadline' | 'priority' | 'none';
  onTaskStatusChange: (taskId: string, newStatus: Task['status']) => void;
  getSortedTasks: (status: TaskSectionType) => Task[];
}

const ListView: React.FC<ListViewProps> = ({ sections, onTaskStatusChange, getSortedTasks }) => {
  const allTasks = sections.flatMap((section) => getSortedTasks(section));

  return (
    <div className="bg-light rounded-lg">
      {allTasks.length === 0 ? (
        <div className="p-xl text-center text-secondary">No tasks to display</div>
      ) : (
        <div className="divide-y">
          {allTasks.map((task) => (
            <div key={task.id} className="hover:bg-grey transition-fast">
              <TaskItem task={task} onStatusChange={onTaskStatusChange} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListView;
