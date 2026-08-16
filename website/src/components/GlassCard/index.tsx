import React from 'react';
import styles from './styles.module.css';

export interface GlassCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient-border' | 'highlight';
  glowOnHover?: boolean;
  href?: string;
}

export default function GlassCard({
  title,
  description,
  icon,
  children,
  className = '',
  size = 'md',
  variant = 'default',
  glowOnHover = true,
  href,
}: GlassCardProps): JSX.Element {
  const sizeClass = styles[size];
  const variantClass = styles[variant];
  const glowClass = glowOnHover ? styles.glowHover : '';

  const cardContent = (
    <>
      {icon && <div className={styles.icon}>{icon}</div>}
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </>
  );

  const classes = `${styles.glassCard} ${sizeClass} ${variantClass} ${glowClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={`${classes} ${styles.link}`}>
        {cardContent}
      </a>
    );
  }

  return <div className={classes}>{cardContent}</div>;
}
