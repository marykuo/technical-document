
import React from 'react';

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2 mb-4 mt-8 pb-2 border-b border-sky-100 dark:border-slate-800">
      {icon && <span className="text-sky-500">{icon}</span>}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
        {title}
      </h3>
    </div>
  );
};

export default SectionHeader;
