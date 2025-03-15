import React, { useState } from 'react';
import Home from './components/Home';
import Header from './components/Header';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = (): void => {
    console.log('Toggling sidebar, current state:', isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Log state changes
  React.useEffect(() => {
    console.log('Sidebar state:', isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div className="min-h-full bg-grey flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-light shadow-md flex-shrink-0 border-r transition-all duration-300 h-screen overflow-y-auto ${
          !isSidebarOpen ? '-ml-64' : ''
        }`}
      >
        {/* Workspace section */}
        <div className="p-md border-b">
          <div className="flex items-center justify-between mb-sm">
            <div className="flex items-center gap-sm">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white text-sm font-medium">
                W
              </div>
              <span className="font-medium">Workspace</span>
            </div>
            <button className="p-xs rounded-sm hover-bg-grey transition-fast">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-secondary)">
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </button>
          </div>
          <button className="w-full text-left text-sm text-secondary hover-bg-grey p-xs rounded-sm transition-fast">
            Switch workspace
          </button>
        </div>

        {/* Main navigation */}
        <nav className="p-sm">
          {[
            {
              name: 'My Tasks',
              icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
            },
            {
              name: 'Inbox',
              icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
            },
            {
              name: 'Projects',
              icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
            },
            {
              name: 'Reporting',
              icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 16H7V7h10v12z',
            },
          ].map((item) => (
            <button
              key={item.name}
              className="w-full flex items-center gap-sm p-sm rounded-md hover-bg-grey transition-fast mb-xs text-secondary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d={item.icon} />
              </svg>
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Favorites section */}
        <div className="p-sm border-t">
          <div className="flex items-center justify-between p-sm">
            <span className="text-sm font-medium text-secondary">Favorites</span>
            <button className="p-xs rounded-sm hover-bg-grey transition-fast">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-secondary)">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
          </div>
          {['Marketing', 'Design System', 'Product Roadmap'].map((project) => (
            <button
              key={project}
              className="w-full flex items-center gap-sm p-sm rounded-md hover-bg-grey transition-fast mb-xs text-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
              </svg>
              <span className="text-sm">{project}</span>
            </button>
          ))}
        </div>

        {/* Teams section */}
        <div className="p-sm border-t">
          <div className="flex items-center justify-between p-sm">
            <span className="text-sm font-medium text-secondary">Teams</span>
            <button className="p-xs rounded-sm hover-bg-grey transition-fast">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-secondary)">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
          </div>
          {['Engineering', 'Design', 'Marketing'].map((team) => (
            <button
              key={team}
              className="w-full flex items-center gap-sm p-sm rounded-md hover-bg-grey transition-fast mb-xs text-secondary"
            >
              <div className="w-4 h-4 rounded-sm bg-primary" />
              <span className="text-sm">{team}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 transition-all duration-300">
        <Header onToggleSidebar={toggleSidebar} />
        <Home />
      </div>
    </div>
  );
};

export default App;
