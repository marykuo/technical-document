
import React, { useState } from 'react';
import { JUnitData } from '../types';
import CodeBlock from './CodeBlock';
import SectionHeader from './SectionHeader';

interface VersionColumnProps {
  data: JUnitData;
}

const VersionColumn: React.FC<VersionColumnProps> = ({ data }) => {
  const [depType, setDepType] = useState<'maven' | 'gradle'>('maven');

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-x border-slate-100 dark:border-slate-800 px-6 py-8 animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-sky-600 dark:text-sky-400 mb-2">{data.version}</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
          "{data.overview}"
        </p>
      </div>

      {/* Dependency Section */}
      <section>
        <SectionHeader title="Dependency" />
        <div className="flex gap-2 mb-3">
          {(['maven', 'gradle'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setDepType(type)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                depType === type
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
        <CodeBlock code={data.dependencies[depType]} />
      </section>

      {/* Assertions */}
      <section>
        <SectionHeader title="Assertions" />
        {data.assertions.map((feature, i) => (
          <div key={i} className="mb-6">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{feature.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{feature.description}</p>
            {feature.snippets?.map((s, si) => (
              <CodeBlock key={si} code={s.code} label={s.label} />
            ))}
          </div>
        ))}
      </section>

      {/* Assumptions */}
      <section>
        <SectionHeader title="Assumptions" />
        {data.assumptions.map((feature, i) => (
          <div key={i} className="mb-6">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{feature.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{feature.description}</p>
            {feature.snippets?.map((s, si) => (
              <CodeBlock key={si} code={s.code} label={s.label} />
            ))}
          </div>
        ))}
      </section>

      {/* Annotations */}
      <section>
        <SectionHeader title="Annotations" />
        {data.annotations.map((feature, i) => (
          <div key={i} className="mb-6">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{feature.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{feature.description}</p>
            {feature.list && (
              <ul className="space-y-2">
                {feature.list.map((item, li) => (
                  <li key={li} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default VersionColumn;
