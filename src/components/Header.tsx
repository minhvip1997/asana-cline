import React from 'react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-light shadow-sm">
      {/* Top header bar */}
      <div className="flex items-center justify-between p-sm border-b">
        {/* Left section */}
        <div className="flex items-center gap-md">
          <button className="text-primary hover-bg-grey p-xs rounded-sm transition-fast">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
          </button>
          <div className="text-lg font-medium text-primary">Asana</div>
          <div className="search-container w-64">
            <input
              type="text"
              placeholder="Search"
              className="bg-grey rounded-md py-sm pl-10 pr-md text-sm w-full border-0 placeholder-secondary"
            />
            <div className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-secondary)">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Center navigation */}
        <nav className="flex gap-md">
          {['Home', 'My Tasks', 'Projects', 'Files'].map((item) => (
            <button
              key={item}
              onClick={() => onViewChange(item.toLowerCase())}
              className={`text-sm font-medium px-sm py-xs rounded-sm transition-fast ${
                currentView === item.toLowerCase() ? 'text-primary' : 'text-secondary hover-bg-grey'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-sm">
          <button className="bg-primary text-white text-sm rounded-md px-md py-sm hover-shadow transition-fast">
            Create
          </button>
          <button className="p-xs rounded-full hover-bg-grey transition-fast">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--text-secondary)">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </button>
          <button className="p-xs rounded-full hover-bg-grey transition-fast">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--text-secondary)">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom project bar */}
      <div className="flex items-center justify-between p-md">
        <div className="flex items-center gap-md">
          <h1 className="text-xl font-medium text-primary">My Projects</h1>
          <div className="text-sm text-secondary">3 projects</div>
        </div>
        <div className="flex gap-sm">
          <button className="text-sm text-secondary hover-bg-grey px-sm py-xs rounded-sm transition-fast">
            Sort
          </button>
          <button className="text-sm text-secondary hover-bg-grey px-sm py-xs rounded-sm transition-fast">
            Filter
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
