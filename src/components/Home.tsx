import React from 'react';

const Home: React.FC<{ onNavigate: (view: 'home' | 'tasks') => void }> = ({ onNavigate }) => {
  const quickActions = [
    {
      title: 'Create Task',
      icon: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
      color: 'var(--primary-color)',
    },
    {
      title: 'Create Project',
      icon: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
      color: 'var(--success-color)',
    },
    {
      title: 'Send Message',
      icon: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z',
      color: 'var(--warning-color)',
    },
  ];

  const recentProjects = [
    { name: 'Website Redesign', tasks: 12, completion: 75 },
    { name: 'Mobile App Development', tasks: 24, completion: 45 },
    { name: 'Brand Guidelines', tasks: 8, completion: 90 },
    { name: 'Q1 Planning', tasks: 16, completion: 30 },
  ];

  const todaysTasks = [
    { title: 'Review design mockups', project: 'Website Redesign', priority: 'High' },
    { title: 'Team sync meeting', project: 'General', priority: 'Medium' },
    { title: 'Update documentation', project: 'Mobile App', priority: 'Low' },
  ];

  const teamActivity = [
    { user: 'Sarah', action: 'completed task', item: 'Update landing page', time: '2h ago' },
    { user: 'Mike', action: 'created project', item: 'Q2 Planning', time: '3h ago' },
    { user: 'Anna', action: 'commented on', item: 'Mobile App Design', time: '4h ago' },
  ];

  return (
    <div className="p-lg">
      <h1 className="text-2xl font-medium mb-lg">Home</h1>

      {/* Quick Actions */}
      <section className="mb-xl">
        <h2 className="text-lg font-medium mb-md">Quick Actions</h2>
        <div className="flex gap-md">
          <button
            className="flex-1 bg-light rounded-lg p-md hover-shadow transition-fast border border-l-4 border-l-primary"
            onClick={() => onNavigate('tasks')}
          >
            <div className="flex items-center gap-sm mb-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary-color)">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="font-medium">Go to My Tasks</span>
            </div>
            <p className="text-sm text-secondary">View and manage your tasks</p>
          </button>
          {quickActions.map((action) => (
            <button
              key={action.title}
              className="flex-1 bg-light rounded-lg p-md hover-shadow transition-fast border"
              style={{ borderLeft: `4px solid ${action.color}` }}
            >
              <div className="flex items-center gap-sm mb-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill={action.color}>
                  <path d={action.icon} />
                </svg>
                <span className="font-medium">{action.title}</span>
              </div>
              <p className="text-sm text-secondary">Click to {action.title.toLowerCase()}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Today's Tasks */}
      <section className="mb-xl">
        <h2 className="text-lg font-medium mb-md">Today's Tasks</h2>
        <div className="bg-light rounded-lg shadow-md">
          {todaysTasks.map((task, index) => (
            <div
              key={task.title}
              className={`p-md flex items-center justify-between ${
                index !== todaysTasks.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="flex items-center gap-md">
                <input type="checkbox" className="w-4 h-4" />
                <div>
                  <h3 className="font-medium mb-xs">{task.title}</h3>
                  <p className="text-sm text-secondary">{task.project}</p>
                </div>
              </div>
              <span
                className={`text-sm px-sm py-xs rounded-md ${
                  task.priority === 'High'
                    ? 'bg-error-color text-white'
                    : task.priority === 'Medium'
                      ? 'bg-warning-color text-white'
                      : 'bg-secondary-color text-secondary'
                }`}
              >
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Projects Grid */}
      <section className="mb-xl">
        <h2 className="text-lg font-medium mb-md">Recent Projects</h2>
        <div className="grid grid-cols-2 gap-md">
          {recentProjects.map((project) => (
            <div key={project.name} className="bg-light rounded-lg p-md shadow-md">
              <div className="flex justify-between items-center mb-md">
                <h3 className="font-medium">{project.name}</h3>
                <span className="text-sm text-secondary">{project.tasks} tasks</span>
              </div>
              <div className="relative h-2 bg-secondary-color rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-primary rounded-full"
                  style={{ width: `${project.completion}%` }}
                />
              </div>
              <p className="text-sm text-secondary mt-sm">{project.completion}% completed</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Activity */}
      <section>
        <h2 className="text-lg font-medium mb-md">Team Activity</h2>
        <div className="bg-light rounded-lg shadow-md">
          {teamActivity.map((activity, index) => (
            <div
              key={`${activity.user}-${activity.item}`}
              className={`p-md flex items-center gap-md ${
                index !== teamActivity.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                {activity.user[0]}
              </div>
              <div className="flex-1">
                <p>
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-secondary">{activity.action}</span>{' '}
                  <span className="font-medium">{activity.item}</span>
                </p>
                <p className="text-sm text-secondary">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
