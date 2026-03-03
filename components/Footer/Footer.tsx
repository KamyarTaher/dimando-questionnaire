import { fetchConfig } from '@/lib/api';
import styles from './Footer.module.scss';

export default async function Footer() {
  const { footer } = (await fetchConfig()).questionnaire;

  return (
    <footer className={styles.footer}>
      <small className={styles.copyright}>{footer.copyright}</small>
      <nav className={styles.links}>
        {footer.links.map((link, i) => (
          <span key={link.name}>
            {i > 0 && <span aria-hidden="true"> | </span>}
            <a href={link.url}>{link.name}</a>
          </span>
        ))}
      </nav>
    </footer>
  );
}
