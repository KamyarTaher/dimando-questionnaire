import { clsx } from '@/lib/clsx';
import styles from './RadioOption.module.scss';

interface RadioOptionProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function RadioOption({
  label,
  selected = false,
  onClick,
}: RadioOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      className={clsx(styles.option, selected && styles.selected)}
      onClick={onClick}
      aria-checked={selected}
    >
      <span
        className={styles.indicator}
        aria-hidden="true"
      />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
