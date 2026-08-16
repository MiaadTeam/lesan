import React from 'react';
import styles from './styles.module.css';

export interface BentoGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: string;
  className?: string;
}

export default function BentoGrid({
  children,
  columns = 3,
  gap = '16px',
  className = '',
}: BentoGridProps): JSX.Element {
  return (
    <div
      className={`${styles.bentoGrid} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}
    </div>
  );
}

export interface BentoItemProps {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
}

export function BentoItem({
  children,
  colSpan = 1,
  rowSpan = 1,
  className = '',
}: BentoItemProps): JSX.Element {
  return (
    <div
      className={`${styles.bentoItem} ${className}`}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      {children}
    </div>
  );
}
