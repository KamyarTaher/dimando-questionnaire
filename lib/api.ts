import type { ApiResponse, AppConfig } from '@/types/questionnaire';

const API_URL = 'https://test-config.free.beeceptor.com';

function normalizeConfig(raw: ApiResponse): AppConfig {
  return {
    homepage: raw.homepage,
    questionnaire: {
      supTitle: raw.questionnaire['sup-title'],
      description: raw.questionnaire.description,
      results: raw.questionnaire.results,
      footer: raw.questionnaire.footer,
    },
    questionnaires: raw.questionnaires.map((q) => ({
      id: q.id,
      color: q.color,
      backgroundType: q['background-type'],
      title: q.title,
      description: q.description,
      questions: q.questions.map((question) => ({
        question: question.question,
        validation: question.validation,
        followUpOptions: question['follow-up-options'],
      })),
    })),
  };
}

export async function fetchConfig(): Promise<AppConfig> {
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Failed to fetch config: ${res.status}`);
  }

  const raw: ApiResponse = await res.json();
  return normalizeConfig(raw);
}
