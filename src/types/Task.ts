export interface Task {
  id: string;
  title: string;
  description?: string;
  project: string;
  dueDate: Date | null;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Done';
}

export type TaskSection = 'Todo' | 'In Progress' | 'Done';
