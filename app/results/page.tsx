import Link from 'next/link';
import { fetchConfig } from '@/lib/api';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ArrowIcon from '@/components/ArrowIcon/ArrowIcon';
import ResultsContent from '@/components/ResultsContent/ResultsContent';
import styles from './page.module.scss';

export default async function ResultsPage() {
  const config = await fetchConfig();
  const { results, supTitle } = config.questionnaire;

  return (
    <>
      <Header />
      <main className={styles.page}>
        <Link
          href="/"
          className={styles.homeLink}
        >
          <ArrowIcon direction="left" />
          Home
        </Link>

        <h1 className={styles.title}>{results.title}</h1>

        <ResultsContent
          questionnaires={config.questionnaires}
          descriptionTemplate={results.description}
          supTitleTemplate={supTitle}
        />
      </main>
      <Footer />
    </>
  );
}
