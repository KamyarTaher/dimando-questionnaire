export type BackgroundType = 'a1' | 'a2' | 'a3';

interface ApiQuestionnaire {
  id: string;
  color: string;
  'background-type': BackgroundType;
  title: string;
  description: string;
  questions: ApiQuestion[];
}

interface ApiQuestion {
  question: string;
  validation: string;
  'follow-up-options': string[];
}

interface ApiQuestionnairePageConfig {
  'sup-title': string;
  description: string;
  results: ResultsConfig;
  footer: FooterConfig;
}

export interface ApiResponse {
  questionnaires: ApiQuestionnaire[];
  homepage: HomepageConfig;
  questionnaire: ApiQuestionnairePageConfig;
}

export interface Questionnaire {
  id: string;
  color: string;
  backgroundType: BackgroundType;
  title: string;
  description: string;
  questions: Question[];
}

export interface Question {
  question: string;
  validation: string;
  followUpOptions: string[];
}

export interface HomepageConfig {
  title: string;
  description: string;
}

export interface QuestionnairePageConfig {
  supTitle: string;
  description: string;
  results: ResultsConfig;
  footer: FooterConfig;
}

export interface AppConfig {
  questionnaires: Questionnaire[];
  homepage: HomepageConfig;
  questionnaire: QuestionnairePageConfig;
}

export interface ResultsConfig {
  title: string;
  description: string;
}

export interface FooterConfig {
  copyright: string;
  links: FooterLink[];
}

export interface FooterLink {
  name: string;
  url: string;
}

export type ValidationOperator = '<=' | '<' | '=' | '>' | '>=';

export interface ParsedValidation {
  operator: ValidationOperator;
  value: number;
}

export const BACKGROUND_TYPE_TO_IMAGE_PREFIX: Record<
  BackgroundType,
  'a' | 'b' | 'c'
> = {
  a1: 'a',
  a2: 'b',
  a3: 'c',
};
