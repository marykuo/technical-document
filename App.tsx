
import React, { useState, useEffect } from 'react';
import { JUnitVersion } from './types';
import { JUNIT_DATA } from './constants';
import CodeBlock from './components/CodeBlock';
import SectionHeader from './components/SectionHeader';

const App: React.FC = () => {
  const [selectedVersions, setSelectedVersions] = useState<JUnitVersion[]>(['JUnit 5']);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Initial state check from system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isSidebarPinned, setIsSidebarPinned] = useState<boolean>(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState<boolean>(false);
  const [depTypes, setDepTypes] = useState<Record<string, 'maven' | 'gradle'>>({
    'JUnit 4': 'maven',
    'JUnit 5': 'maven',
    'JUnit 6': 'maven'
  });

  // Handle theme synchronization with the DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleVersion = (version: JUnitVersion) => {
    setSelectedVersions((prev) => {
      let next;
      if (prev.includes(version)) {
        if (prev.length === 1) return prev;
        next = prev.filter((v) => v !== version);
      } else {
        next = [...prev, version];
      }
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
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const setDepType = (version: string, type: 'maven' | 'gradle') => {
    setDepTypes(prev => ({ ...prev, [version]: type }));
  };

  const sidebarExpanded = isSidebarPinned || isSidebarHovered;
  const gridStyle = {
    gridTemplateColumns: `repeat(${selectedVersions.length}, minmax(320px, 1fr))`,
    minWidth: selectedVersions.length > 2 ? '1200px' : '100%'
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <header className="sticky top-0 z-[70] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-sky-100 dark:border-slate-800">
        <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-sky-500 rounded-lg shadow-lg shadow-sky-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              JUnit <span className="text-sky-500 italic font-medium">Technical Guide</span>
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
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all duration-200"
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
        <aside 
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          className={`fixed left-0 top-16 h-[calc(100vh-64px)] z-[65] bg-white dark:bg-slate-900 border-r border-sky-100 dark:border-slate-800 transition-all duration-300 ease-in-out group flex flex-col ${
            sidebarExpanded ? 'w-64 shadow-2xl shadow-sky-500/10' : 'w-16'
          }`}
        >
          <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-sky-50 dark:hover:bg-slate-800 group/item ${sidebarExpanded ? 'justify-start' : 'justify-center'}`}
              >
                <div className="w-6 h-6 flex-shrink-0 text-slate-400 group-hover/item:text-sky-500 transition-colors"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg></div>
                {sidebarExpanded && <span className="text-sm font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap animate-fadeInFast">{item.label}</span>}
              </button>
            ))}
          </div>
          <div className="p-3 border-t border-sky-50 dark:border-slate-800">
            <button onClick={() => setIsSidebarPinned(!isSidebarPinned)} className={`w-full flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all ${sidebarExpanded ? 'justify-start' : 'justify-center'}`}>
              <div className={`w-6 h-6 flex-shrink-0 transition-colors ${isSidebarPinned ? 'text-sky-500' : 'text-slate-400'}`}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" /></svg></div>
              {sidebarExpanded && <span className="text-xs font-bold uppercase tracking-wider text-slate-400"> {isSidebarPinned ? 'Unpin' : 'Pin'} </span>}
            </button>
          </div>
        </aside>

        <div className={`flex-1 transition-all duration-300 ${isSidebarPinned ? 'ml-64' : 'ml-16'}`}>
          <div className="sticky top-16 z-[60] bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 shadow-sm overflow-x-auto">
            <div className="grid mx-auto" style={gridStyle}>
              {selectedVersions.map(v => (
                <div key={v} className="px-8 py-5 border-r border-slate-100 dark:border-slate-800 last:border-r-0 transition-colors duration-300">
                  <h2 className="text-2xl font-black text-sky-600 dark:text-sky-400 tracking-tight">{v}</h2>
                </div>
              ))}
            </div>
          </div>

          <main className="mx-auto overflow-x-auto pb-20">
            {/* Overview Section */}
            <div id="overviews" className="border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
               <div className="grid" style={gridStyle}>
                 {selectedVersions.map(v => (
                   <div key={v} className="px-8 py-10 border-r border-slate-100 dark:border-slate-800 last:border-r-0">
                     <SectionHeader title="Overviews" />
                     <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic mt-4">"{JUNIT_DATA[v].overview}"</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* Dependency Section */}
            <div id="dependency" className="border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
               <div className="grid" style={gridStyle}>
                 {selectedVersions.map(v => (
                   <div key={v} className="px-8 py-10 border-r border-slate-100 dark:border-slate-800 last:border-r-0">
                      <SectionHeader title="Dependency" />
                      <div className="flex gap-2 mb-4 mt-6">
                        {(['maven', 'gradle'] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setDepType(v, type)}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                              depTypes[v] === type
                                ? 'bg-sky-500 text-white shadow-md'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}
                          >
                            {type.toUpperCase()}
                          </button>
                        ))}
                      </div>
                      <CodeBlock code={JUNIT_DATA[v].dependencies[depTypes[v]]} />
                   </div>
                 ))}
               </div>
            </div>

            {/* Assertions Section */}
            <div id="assertions" className="border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
               <div className="grid" style={gridStyle}>
                 {selectedVersions.map(v => (
                   <div key={v} className="px-8 py-10 border-r border-slate-100 dark:border-slate-800 last:border-r-0">
                      <SectionHeader title="Assertions" />
                      <div className="mt-6">
                        {JUNIT_DATA[v].assertions.map((feat, i) => (
                          <div key={i} className="mb-8 last:mb-0">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">{feat.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{feat.description}</p>
                            {feat.snippets?.map((s, si) => <CodeBlock key={si} code={s.code} label={s.label} />)}
                          </div>
                        ))}
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Assumptions Section */}
            <div id="assumptions" className="border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
               <div className="grid" style={gridStyle}>
                 {selectedVersions.map(v => (
                   <div key={v} className="px-8 py-10 border-r border-slate-100 dark:border-slate-800 last:border-r-0">
                      <SectionHeader title="Assumptions" />
                      <div className="mt-6">
                        {JUNIT_DATA[v].assumptions.map((feat, i) => (
                          <div key={i} className="mb-8 last:mb-0">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">{feat.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{feat.description}</p>
                            {feat.snippets?.map((s, si) => <CodeBlock key={si} code={s.code} label={s.label} />)}
                          </div>
                        ))}
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Annotations Section */}
            <div id="annotations">
               <div className="grid" style={gridStyle}>
                 {selectedVersions.map(v => (
                   <div key={v} className="px-8 py-10 border-r border-slate-100 dark:border-slate-800 last:border-r-0">
                      <SectionHeader title="Annotations" />
                      <div className="mt-6">
                        {JUNIT_DATA[v].annotations.map((feat, i) => (
                          <div key={i} className="mb-8 last:mb-0">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">{feat.title}</h4>
                            {feat.list && (
                              <ul className="space-y-2 mt-3">
                                {feat.list.map((item, li) => (
                                  <li key={li} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-400">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-sky-400 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
