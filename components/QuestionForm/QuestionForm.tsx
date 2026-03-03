'use client';

import { useRouter } from 'next/navigation';
import { clsx } from '@/lib/clsx';
import { useQuestionnaireStore } from '@/store/useQuestionnaireStore';
import type { ParsedValidation } from '@/types/questionnaire';
import { needsFollowUp } from '@/lib/validation';
import RatingButtonGroup from '@/components/RatingButtonGroup/RatingButtonGroup';
import RadioOption from '@/components/RadioOption/RadioOption';
import Button from '@/components/Button/Button';
import ArrowIcon from '@/components/ArrowIcon/ArrowIcon';
import styles from './QuestionForm.module.scss';

interface QuestionFormProps {
  questionnaireId: string;
  questionIndex: number;
  isLast: boolean;
  validation: ParsedValidation | null;
  followUpOptions: string[];
}

export default function QuestionForm({
  questionnaireId,
  questionIndex,
  isLast,
  validation,
  followUpOptions,
}: QuestionFormProps) {
  const router = useRouter();
  const answer = useQuestionnaireStore(
    (s) => s.answers[questionnaireId]?.[questionIndex],
  );
  const setRating = useQuestionnaireStore((s) => s.setRating);
  const setFollowUp = useQuestionnaireStore((s) => s.setFollowUp);
  const completeQuestionnaire = useQuestionnaireStore(
    (s) => s.completeQuestionnaire,
  );
  const clearQuestionnaire = useQuestionnaireStore((s) => s.clearQuestionnaire);

  const rating = answer?.rating ?? 0;
  const selectedFollowUp = answer?.followUp;

  const hasRating = rating > 0;
  const showFollowUp =
    hasRating &&
    validation &&
    followUpOptions.length > 0 &&
    needsFollowUp(rating, validation);
  const canProceed = hasRating && (!showFollowUp || selectedFollowUp);

  const handleContinue = () => {
    if (isLast) {
      completeQuestionnaire(questionnaireId);
      router.push('/results');
    } else {
      router.push(`/questionnaires/${questionnaireId}/${questionIndex + 2}`);
    }
  };

  return (
    <div className={styles.form}>
      <RatingButtonGroup
        selected={hasRating ? rating : undefined}
        onSelect={(value) => setRating(questionnaireId, questionIndex, value)}
      />

      <div
        className={clsx(styles.followUpWrapper, showFollowUp && styles.visible)}
        aria-hidden={!showFollowUp}
        inert={!showFollowUp || undefined}
      >
        <div className={styles.followUpInner}>
          <div
            className={styles.followUp}
            role="radiogroup"
            aria-label="Follow-up options"
          >
            {followUpOptions.map((option) => (
              <RadioOption
                key={option}
                label={option}
                selected={selectedFollowUp === option}
                onClick={() =>
                  setFollowUp(questionnaireId, questionIndex, option)
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          size="large"
          disabled={!canProceed}
          onClick={handleContinue}
        >
          {isLast ? 'Finish and Save' : 'Next Question'}
          <ArrowIcon />
        </Button>
      </div>

      {!isLast && (
        <div className={styles.quitActions}>
          <Button
            size="small"
            variant="secondary"
            onClick={() => {
              clearQuestionnaire(questionnaireId);
              router.push('/');
            }}
          >
            Quit
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() => router.push('/')}
          >
            Quit &amp; Save
          </Button>
        </div>
      )}
    </div>
  );
}
