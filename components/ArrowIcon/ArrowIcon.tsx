import { clsx } from '@/lib/clsx';
import styles from './ArrowIcon.module.scss';

interface ArrowIconProps {
  direction?: 'left' | 'right';
  className?: string;
}

export default function ArrowIcon({
  direction = 'right',
  className,
}: ArrowIconProps) {
  return (
    <svg
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={clsx(
        styles.icon,
        direction === 'left' && styles.left,
        className,
      )}
    >
      <path
        d="M7.25 4.5L6.5375 3.8L7.5875 2.75H0V1.75H7.5875L6.55 0.7L7.2625 0L9.5 2.25L7.25 4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
