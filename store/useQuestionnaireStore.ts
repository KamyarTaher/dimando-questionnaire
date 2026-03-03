import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuestionAnswer {
  rating: number;
  followUp: string | null;
}

interface QuestionnaireState {
  answers: Record<string, Record<number, QuestionAnswer>>;
  completedIds: string[];

  setRating: (
    questionnaireId: string,
    questionIndex: number,
    rating: number,
  ) => void;
  setFollowUp: (
    questionnaireId: string,
    questionIndex: number,
    option: string,
  ) => void;
  completeQuestionnaire: (questionnaireId: string) => void;
  clearQuestionnaire: (questionnaireId: string) => void;
  reset: () => void;
}

function updateAnswer(
  state: QuestionnaireState,
  questionnaireId: string,
  questionIndex: number,
  update: Partial<QuestionAnswer>,
) {
  const questionnaire = state.answers[questionnaireId] ?? {};
  const existing = questionnaire[questionIndex];

  return {
    answers: {
      ...state.answers,
      [questionnaireId]: {
        ...questionnaire,
        [questionIndex]: {
          rating: existing?.rating ?? 0,
          followUp: existing?.followUp ?? null,
          ...update,
        },
      },
    },
  };
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set) => ({
      answers: {},
      completedIds: [],

      setRating: (questionnaireId, questionIndex, rating) =>
        set((state) =>
          updateAnswer(state, questionnaireId, questionIndex, {
            rating,
            followUp: null,
          }),
        ),

      setFollowUp: (questionnaireId, questionIndex, option) =>
        set((state) => {
          const existing = state.answers[questionnaireId]?.[questionIndex];
          if (!existing) return state;
          return updateAnswer(state, questionnaireId, questionIndex, {
            followUp: option,
          });
        }),

      completeQuestionnaire: (questionnaireId) =>
        set((state) =>
          state.completedIds.includes(questionnaireId)
            ? state
            : { completedIds: [...state.completedIds, questionnaireId] },
        ),

      clearQuestionnaire: (questionnaireId) =>
        set((state) => {
          const answers = { ...state.answers };
          delete answers[questionnaireId];
          return {
            answers,
            completedIds: state.completedIds.filter(
              (id) => id !== questionnaireId,
            ),
          };
        }),

      reset: () => set({ answers: {}, completedIds: [] }),
    }),
    { name: 'questionnaire-storage' },
  ),
);
