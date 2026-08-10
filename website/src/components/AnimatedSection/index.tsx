import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeIn' | 'fadeInLeft' | 'fadeInRight';
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  className = '',
  once = true,
}: AnimatedSectionProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={`${styles.animatedSection} ${styles[animation]} ${isVisible ? styles.visible : ''} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = '',
}: StaggerContainerProps): JSX.Element {
  return (
    <div className={`${styles.staggerContainer} ${className}`}>
      {React.Children.map(children, (child, index) => (
        <AnimatedSection delay={index * staggerDelay} animation="fadeInUp">
          {child}
        </AnimatedSection>
      ))}
    </div>
  );
}
