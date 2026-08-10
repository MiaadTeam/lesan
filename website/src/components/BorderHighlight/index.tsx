import React from 'react';
import styles from './styles.module.css';

export interface BorderHighlightProps {
  children: React.ReactNode;
  color?: 'cyan' | 'purple' | 'emerald' | 'blue';
  animationSpeed?: number;
  className?: string;
}

export default function BorderHighlight({
  children,
  color = 'cyan',
  animationSpeed = 3,
  className = '',
}: BorderHighlightProps): JSX.Element {
  const colorMap = {
    cyan: '#22D3EE',
    purple: '#A855F7',
    emerald: '#10B981',
    blue: '#3B82F6',
  };

  const borderColor = colorMap[color];

  return (
    <div 
      className={`${styles.borderHighlight} ${className}`}
      style={{
        '--border-color': borderColor,
        '--animation-speed': `${animationSpeed}s`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
