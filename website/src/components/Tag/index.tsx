import React from 'react';
import styles from './styles.module.css';

export interface TagProps {
  label: string;
  variant?: 'default' | 'cyan' | 'purple' | 'emerald' | 'blue';
  icon?: React.ReactNode;
  className?: string;
  href?: string;
}

export default function Tag({
  label,
  variant = 'default',
  icon,
  className = '',
  href,
}: TagProps): JSX.Element {
  const variantClass = styles[variant];
  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${styles.tag} ${variantClass} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <span className={`${styles.tag} ${variantClass} ${className}`}>
      {content}
    </span>
  );
}
