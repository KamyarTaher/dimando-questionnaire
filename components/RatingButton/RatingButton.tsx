import { clsx } from '@/lib/clsx';
import styles from './RatingButton.module.scss';

interface RatingButtonProps {
  value: number;
  filled?: boolean;
  checked?: boolean;
  onClick?: (value: number) => void;
  tabIndex?: number;
}

export default function RatingButton({
  value,
  filled = false,
  checked = false,
  onClick,
  tabIndex,
}: RatingButtonProps) {
  if (!onClick) {
    return (
      <span
        className={clsx(
          styles.rating,
          filled && styles.selected,
          styles.static,
        )}
      >
        {value}
      </span>
    );
  }

  return (
    <button
      type="button"
      role="radio"
      className={clsx(styles.rating, filled && styles.selected)}
      onClick={() => onClick(value)}
      aria-label={`Rate ${value} out of 10`}
      aria-checked={checked}
      tabIndex={tabIndex}
    >
      {value}
    </button>
  );
}
