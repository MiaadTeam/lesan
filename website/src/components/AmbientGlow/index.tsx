import React from 'react';
import styles from './styles.module.css';

export interface AmbientGlowProps {
  color?: 'cyan' | 'purple' | 'emerald' | 'blue';
  size?: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  intensity?: number;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AmbientGlow({
  color = 'cyan',
  size = 600,
  top,
  left,
  right,
  bottom,
  intensity = 0.5,
  animate = true,
  className = '',
  style = {},
}: AmbientGlowProps): JSX.Element {
  const colorMap = {
    cyan: 'rgba(34, 211, 238,',
    purple: 'rgba(168, 85, 247,',
    emerald: 'rgba(16, 185, 129,',
    blue: 'rgba(59, 130, 246,',
  };

  const glowColor = colorMap[color];
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    ...(top !== undefined && { top }),
    ...(left !== undefined && { left }),
    ...(right !== undefined && { right }),
    ...(bottom !== undefined && { bottom }),
    ...style,
  };

  return (
    <div
      className={`${styles.ambientGlow} ${animate ? styles.animate : ''} ${className}`}
      style={positionStyle}
    >
      <div
        className={styles.glowInner}
        style={{
          background: `radial-gradient(circle, ${glowColor} ${intensity}) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
