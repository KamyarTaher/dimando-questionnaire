import { clsx } from '@/lib/clsx';
import styles from './Card.module.scss';

interface CardProps {
  title: string;
  description?: string;
  label: string;
  variant?: 'default' | 'results';
  completed?: boolean;
  icon?: React.ReactNode;
  color?: string;
}

export default function Card({
  title,
  description,
  label,
  variant = 'default',
  completed,
  icon,
  color,
}: CardProps) {
  return (
    <article
      className={clsx(
        styles.card,
        styles[variant],
        completed && styles.completed,
      )}
      style={
        color ? ({ '--card-color': color } as React.CSSProperties) : undefined
      }
    >
      <div>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.footer}>
        <span className={styles.label}>{label}</span>
        {icon && (
          <span
            className={styles.iconCircle}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
      </div>
    </article>
  );
}
