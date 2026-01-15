
export type JUnitVersion = 'JUnit 4' | 'JUnit 5' | 'JUnit 6';

export interface CodeSnippet {
  language: 'xml' | 'groovy' | 'java';
  label: string;
  code: string;
}

export interface JUnitFeature {
  title: string;
  description: string;
  snippets?: CodeSnippet[];
  list?: string[];
}

export interface JUnitData {
  version: JUnitVersion;
  overview: string;
  dependencies: {
    maven: string;
    gradle: string;
  };
  assertions: JUnitFeature[];
  assumptions: JUnitFeature[];
  annotations: JUnitFeature[];
}

export interface ComparisonData {
  [key: string]: JUnitData;
}
