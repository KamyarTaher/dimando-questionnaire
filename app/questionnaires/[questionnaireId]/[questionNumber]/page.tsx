import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchConfig } from '@/lib/api';
import { parseValidation } from '@/lib/validation';
import { BACKGROUND_TYPE_TO_IMAGE_PREFIX } from '@/types/questionnaire';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ArrowIcon from '@/components/ArrowIcon/ArrowIcon';
import QuestionForm from '@/components/QuestionForm/QuestionForm';
import styles from './page.module.scss';

interface QuestionPageProps {
  params: Promise<{
    questionnaireId: string;
    questionNumber: string;
  }>;
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const [{ questionnaireId, questionNumber }, config] = await Promise.all([
    params,
    fetchConfig(),
  ]);

  const questionnaire = config.questionnaires.find(
    (q) => q.id === questionnaireId,
  );
  if (!questionnaire) notFound();

  const questionIndex = Number(questionNumber) - 1;
  const question = questionnaire.questions[questionIndex];
  if (!question) notFound();

  const total = questionnaire.questions.length;
  const bgPrefix =
    BACKGROUND_TYPE_TO_IMAGE_PREFIX[questionnaire.backgroundType];

  const subtitle = config.questionnaire.supTitle
    .replace('{current}', questionNumber)
    .replace('{total}', String(total));

  const prevHref =
    questionIndex > 0
      ? `/questionnaires/${questionnaireId}/${questionIndex}`
      : `/`;

  return (
    <main
      className={styles.page}
      style={
        {
          '--bg-mobile': `url(/images/${bgPrefix}_m_p.jpg)`,
          '--bg-tablet': `url(/images/${bgPrefix}_t_p.jpg)`,
          '--bg-landscape': `url(/images/${bgPrefix}_t_l.jpg)`,
          '--bg-desktop': `url(/images/${bgPrefix}_d.jpg)`,
        } as React.CSSProperties
      }
    >
      <div className={styles.overlay}>
        <Header variant="light" />
        <div className={styles.content}>
          <Link
            href={prevHref}
            className={styles.backLink}
          >
            <ArrowIcon direction="left" />
            Back
          </Link>

          <p className={styles.subtitle}>{subtitle}</p>
          <h1 className={styles.question}>{question.question}</h1>
          <p className={styles.description}>
            {config.questionnaire.description}
          </p>

          <QuestionForm
            questionnaireId={questionnaireId}
            questionIndex={questionIndex}
            isLast={questionIndex === total - 1}
            validation={parseValidation(question.validation)}
            followUpOptions={question.followUpOptions}
          />
        </div>
        <Footer />
      </div>
    </main>
  );
}
