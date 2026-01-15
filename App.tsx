
import React, { useState, useEffect } from 'react';
import { JUnitVersion } from './types';
import { JUNIT_DATA } from './constants';
import VersionColumn from './components/VersionColumn';

const App: React.FC = () => {
  const [selectedVersions, setSelectedVersions] = useState<JUnitVersion[]>(['JUnit 5']);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState<boolean>(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState<boolean>(false);

  // Initial Theme Setup
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleVersion = (version: JUnitVersion) => {
    setSelectedVersions((prev) => {
      if (prev.includes(version)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((v) => v !== version);
      }
      const next = [...prev, version];
      return (['JUnit 4', 'JUnit 5', 'JUnit 6'] as JUnitVersion[]).filter(v => next.includes(v));
    });
  };

  const navItems = [
    { id: 'overviews', label: 'Overviews', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'dependency', label: 'Dependency', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'assertions', label: 'Assertions', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'assumptions', label: 'Assumptions', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'annotations', label: 'Annotations', icon: 'M7 7h.01M7 11h.01M7 15h.01M11 7h8M11 11h8M11 15h8' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const sidebarExpanded = isSidebarPinned || isSidebarHovered;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Navbar */}
      <header className="sticky top-0 z-[60] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-sky-100 dark:border-slate-800 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-sky-500 rounded-lg shadow-lg shadow-sky-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              JUnit <span className="text-sky-500 italic font-medium">Guide</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {(['JUnit 4', 'JUnit 5', 'JUnit 6'] as JUnitVersion[]).map((v) => (
                <button
                  key={v}
                  onClick={() => toggleVersion(v)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    selectedVersions.includes(v)
                      ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {v}
                </button>
              ))}
            </nav>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          className={`fixed left-0 top-16 h-[calc(100vh-64px)] z-50 bg-white dark:bg-slate-900 border-r border-sky-100 dark:border-slate-800 transition-all duration-300 ease-in-out group flex flex-col ${
            sidebarExpanded ? 'w-64 shadow-2xl shadow-sky-500/10' : 'w-16'
          }`}
        >
          <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-sky-50 dark:hover:bg-slate-800 group/item ${
                  sidebarExpanded ? 'justify-start' : 'justify-center'
                }`}
              >
                <div className="w-6 h-6 flex-shrink-0 text-slate-400 dark:text-slate-500 group-hover/item:text-sky-500 transition-colors">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                {sidebarExpanded && (
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap animate-fadeInFast">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-sky-50 dark:border-slate-800">
            <button
              onClick={() => setIsSidebarPinned(!isSidebarPinned)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all ${
                sidebarExpanded ? 'justify-start' : 'justify-center'
              }`}
            >
              <div className={`w-6 h-6 flex-shrink-0 transition-colors ${isSidebarPinned ? 'text-sky-500' : 'text-slate-400 dark:text-slate-500'}`}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
                </svg>
              </div>
              {sidebarExpanded && (
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                  {isSidebarPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
                </span>
              )}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarPinned ? 'ml-64' : 'ml-16'}`}>
          <main className="max-w-[1920px] mx-auto min-h-[calc(100vh-64px-57px)] overflow-x-auto">
            <div 
              className="grid h-full transition-all duration-500 ease-in-out"
              style={{ 
                gridTemplateColumns: `repeat(${selectedVersions.length}, minmax(320px, 1fr))`,
                minWidth: selectedVersions.length > 2 ? '1200px' : '100%'
              }}
            >
              {selectedVersions.map((version) => (
                <VersionColumn key={version} data={JUNIT_DATA[version]} />
              ))}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white dark:bg-slate-900 border-t border-sky-100 dark:border-slate-800 py-4 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest">
              <span>&copy; 2024 JUnit Comparative Guide</span>
              <div className="flex gap-4">
                <span className="hover:text-sky-500 transition-colors cursor-pointer">Documentation</span>
                <span className="hover:text-sky-500 transition-colors cursor-pointer">Github</span>
                <span className="hover:text-sky-500 transition-colors cursor-pointer">API</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
