import Logo from '@/components/Logo/Logo';
import styles from './Header.module.scss';

interface HeaderProps {
  variant?: 'dark' | 'light';
}

export default function Header({ variant = 'dark' }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div
        className={styles.bar}
        aria-hidden="true"
      />
      <Logo variant={variant} />
    </header>
  );
}
