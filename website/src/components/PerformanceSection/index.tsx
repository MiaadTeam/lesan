import React from 'react';
import styles from './styles.module.css';
import GlassCard from '../GlassCard';
import AnimatedSection from '../AnimatedSection';
import Tag from '../Tag';

const benchmarks = [
  {
    label: 'Query Speed',
    value: '10x',
    suffix: 'faster',
    description: 'Than traditional ORMs',
    color: 'emerald',
  },
  {
    label: 'Bundle Size',
    value: '0',
    suffix: 'KB',
    description: 'Zero runtime overhead',
    color: 'cyan',
  },
  {
    label: 'Type Safety',
    value: '100',
    suffix: '%',
    description: 'End-to-end TypeScript',
    color: 'purple',
  },
];

export default function PerformanceSection(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimatedSection animation="fadeInUp">
          <div className={styles.header}>
            <span className={styles.label}>Performance</span>
            <h2 className={styles.title}>Built for Speed</h2>
            <p className={styles.description}>
              Extreme performance without compromising developer experience.
            </p>
          </div>
        </AnimatedSection>
        
        <div className={styles.grid}>
          {benchmarks.map((benchmark, index) => (
            <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.15}>
              <GlassCard className={styles.card} glowOnHover={true}>
                <div className={styles.cardContent}>
                  <Tag 
                    label={benchmark.label} 
                    variant={benchmark.color as 'emerald' | 'cyan' | 'purple'} 
                  />
                  <div className={styles.metric}>
                    <span className={styles.value}>{benchmark.value}</span>
                    <span className={styles.suffix}>{benchmark.suffix}</span>
                  </div>
                  <p className={styles.metricDesc}>{benchmark.description}</p>
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection animation="fadeIn" delay={0.3}>
          <div className={styles.comparison}>
            <p className={styles.comparisonText}>
              Benchmarks run on Apple M2 Max, querying 10,000 documents with relationships.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
