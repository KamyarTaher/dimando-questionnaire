import { clsx } from '@/lib/clsx';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
}

export default function Button({
  size = 'medium',
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(styles.button, styles[size], styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
