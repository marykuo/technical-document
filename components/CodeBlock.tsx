
import React from 'react';

interface CodeBlockProps {
  code: string;
  label?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, label }) => {
  return (
    <div className="my-3 rounded-lg overflow-hidden border border-sky-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
      {label && (
        <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 border-b border-sky-100 dark:border-slate-700 bg-sky-50 dark:bg-slate-900/50">
          {label}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed text-slate-800 dark:text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
