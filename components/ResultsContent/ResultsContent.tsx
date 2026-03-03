'use client';

import { useState } from 'react';
import {
  useQuestionnaireStore,
  type QuestionAnswer,
} from '@/store/useQuestionnaireStore';
import type { Questionnaire, Question } from '@/types/questionnaire';
import RatingButton from '@/components/RatingButton/RatingButton';
import Button from '@/components/Button/Button';
import styles from './ResultsContent.module.scss';

interface QuestionResultProps {
  question: Question;
  answer?: QuestionAnswer;
  supTitle: string;
}

function QuestionResult({ question, answer, supTitle }: QuestionResultProps) {
  return (
    <div className={styles.questionResult}>
      <p className={styles.supTitle}>{supTitle}</p>
      <h3 className={styles.questionText}>{question.question}</h3>

      <div className={styles.resultRow}>
        {answer?.rating ? (
          <RatingButton
            value={answer.rating}
            filled
          />
        ) : (
          <p className={styles.noAnswer}>Not answered</p>
        )}

        {answer?.followUp && (
          <div className={styles.followUpInfo}>
            <p className={styles.followUpLabel}>Follow up option</p>
            <p className={styles.followUpText}>{answer.followUp}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getScore(
  answers: Record<string, Record<number, QuestionAnswer>>,
  questionnaireId: string,
  totalQuestions: number,
): number {
  const qAnswers = answers[questionnaireId];
  if (!qAnswers) return 0;
  let sum = 0;
  let count = 0;
  for (let i = 0; i < totalQuestions; i++) {
    const rating = qAnswers[i]?.rating;
    if (rating) {
      sum += rating;
      count++;
    }
  }
  return count > 0 ? Math.round(sum / count) : 0;
}

interface ResultsContentProps {
  questionnaires: Questionnaire[];
  descriptionTemplate: string;
  supTitleTemplate: string;
}

export default function ResultsContent({
  questionnaires,
  descriptionTemplate,
  supTitleTemplate,
}: ResultsContentProps) {
  const completedIds = useQuestionnaireStore((s) => s.completedIds);
  const answers = useQuestionnaireStore((s) => s.answers);
  const clearQuestionnaire = useQuestionnaireStore((s) => s.clearQuestionnaire);
  const [filter, setFilter] = useState<string | null>(null);

  const completed = questionnaires.filter((q) => completedIds.includes(q.id));
  const filtered = filter
    ? completed.filter((q) => q.id === filter)
    : completed;

  const description = descriptionTemplate.replace(
    '{number}',
    String(completed.length),
  );

  const handleClear = (id: string) => {
    clearQuestionnaire(id);
    if (filter === id) setFilter(null);
  };

  return (
    <>
      <p className={styles.description}>{description}</p>

      {completed.length === 0 ? (
        <p className={styles.empty}>No completed questionnaires yet.</p>
      ) : (
        <>
          {completed.length > 1 && (
            <div className={styles.filters}>
              {completed.map((q) => (
                <Button
                  key={q.id}
                  size="medium"
                  onClick={() => setFilter(filter === q.id ? null : q.id)}
                  className={
                    filter && filter !== q.id
                      ? styles.filterInactive
                      : undefined
                  }
                >
                  {q.title}
                </Button>
              ))}
            </div>
          )}

          <div className={styles.questionnaires}>
            {filtered.map((q) => {
              const score = getScore(answers, q.id, q.questions.length);

              return (
                <section
                  key={q.id}
                  className={styles.questionnaire}
                >
                  <div className={styles.questionnaireHeader}>
                    <div>
                      <h2 className={styles.questionnaireTitle}>{q.title}</h2>
                      <p className={styles.score}>Score: {score}</p>
                    </div>
                    <Button
                      size="small"
                      onClick={() => handleClear(q.id)}
                    >
                      Clear data
                    </Button>
                  </div>

                  {q.questions.map((question, i) => (
                    <QuestionResult
                      key={`${q.id}-${i}`}
                      question={question}
                      answer={answers[q.id]?.[i]}
                      supTitle={supTitleTemplate
                        .replace('{current}', String(i + 1))
                        .replace('{total}', String(q.questions.length))}
                    />
                  ))}
                </section>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
