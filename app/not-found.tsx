import Link from 'next/link';
import ArrowIcon from '@/components/ArrowIcon/ArrowIcon';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.description}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className={styles.homeLink}
      >
        <ArrowIcon direction="left" />
        Back to Home
      </Link>
    </main>
  );
}
