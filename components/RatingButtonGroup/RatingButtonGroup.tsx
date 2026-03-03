'use client';

import { useRef } from 'react';
import RatingButton from '@/components/RatingButton/RatingButton';
import styles from './RatingButtonGroup.module.scss';

interface RatingButtonGroupProps {
  selected?: number;
  onSelect?: (value: number) => void;
}

const MIN = 1;
const MAX = 10;
const VALUES = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);

export default function RatingButtonGroup({
  selected,
  onSelect,
}: RatingButtonGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onSelect) return;

    const isNext = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const isPrev = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!isNext && !isPrev) return;

    e.preventDefault();
    const current = selected ?? 0;
    const next = isNext
      ? Math.min(current + 1, MAX)
      : Math.max(current - 1, MIN);
    onSelect(next);

    const buttons =
      groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    buttons?.[next - MIN]?.focus();
  };

  return (
    <div
      ref={groupRef}
      className={styles.group}
      role="radiogroup"
      aria-label="Rating"
      onKeyDown={handleKeyDown}
    >
      {VALUES.map((value) => (
        <RatingButton
          key={value}
          value={value}
          filled={selected !== undefined && value <= selected}
          checked={value === selected}
          onClick={onSelect}
          tabIndex={value === (selected ?? MIN) ? 0 : -1}
        />
      ))}
    </div>
  );
}
