'use client';

import Link from 'next/link';
import { useQuestionnaireStore } from '@/store/useQuestionnaireStore';
import Card from '@/components/Card/Card';
import CardIcon from '@/components/CardIcon/CardIcon';
import type { Questionnaire } from '@/types/questionnaire';

interface HomeCardListProps {
  questionnaires: Questionnaire[];
  cardLinkClass?: string;
}

export default function HomeCardList({
  questionnaires,
  cardLinkClass,
}: HomeCardListProps) {
  const completedIds = useQuestionnaireStore((s) => s.completedIds);
  const answers = useQuestionnaireStore((s) => s.answers);

  return (
    <>
      {questionnaires.map((q) => {
        const isCompleted = completedIds.includes(q.id);
        const savedAnswers = answers[q.id];
        const answeredCount = savedAnswers
          ? Object.keys(savedAnswers).length
          : 0;
        const resumeQuestion = isCompleted
          ? 1
          : Math.min(answeredCount + 1, q.questions.length);
        return (
          <Link
            key={q.id}
            href={`/questionnaires/${q.id}/${resumeQuestion}`}
            className={cardLinkClass}
          >
            <Card
              title={q.title}
              description={q.description}
              label={
                answeredCount > 0 && !isCompleted
                  ? `${answeredCount}/${q.questions.length} answered`
                  : `${q.questions.length} Question(s)`
              }
              icon={<CardIcon type={isCompleted ? 'completed' : 'start'} />}
              color={q.color}
              completed={isCompleted}
            />
          </Link>
        );
      })}
      <Link
        href="/results"
        className={cardLinkClass}
      >
        <Card
          title="See results"
          variant="results"
          label="View completed questionnaires"
          icon={<CardIcon type="completed" />}
        />
      </Link>
    </>
  );
}
