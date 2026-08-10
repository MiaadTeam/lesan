import React from 'react';
import styles from './styles.module.css';
import GlassCard from '../GlassCard';
import BentoGrid, { BentoItem } from '../BentoGrid';
import AmbientGlow from '../AmbientGlow';
import AnimatedSection, { StaggerContainer } from '../AnimatedSection';
import Tag from '../Tag';

const features = [
  {
    icon: '⚡',
    title: 'Extreme Performance',
    description: 'Much faster than traditional ORMs or GraphQL with client-driven projections.',
    tag: '10x Faster',
    tagVariant: 'emerald' as const,
    size: 2,
  },
  {
    icon: '🛡️',
    title: 'Type Safety',
    description: 'End-to-end TypeScript safety with automatic type inference.',
    size: 1,
  },
  {
    icon: '🔄',
    title: 'Auto Relations',
    description: 'Automatic bi-directional relationships between models.',
    size: 1,
  },
  {
    icon: '📦',
    title: 'Client Projections',
    description: 'Fetch only the data you need, reducing payload size.',
    size: 1,
  },
  {
    icon: '🗄️',
    title: 'MongoDB Ready',
    description: 'Full MongoDB compatibility with modern developer experience.',
    size: 1,
  },
  {
    icon: '🔧',
    title: 'Cross Platform',
    description: 'Works seamlessly on Node.js, Bun, and Deno.',
    tag: 'Multi-Runtime',
    tagVariant: 'cyan' as const,
    size: 2,
  },
];

export default function FeaturesSection(): JSX.Element {
  return (
    <section className={styles.section}>
      <AmbientGlow 
        color="purple" 
        size={700} 
        top="20%" 
        left="-10%" 
        intensity={0.1}
        animate={true}
      />
      
      <div className={styles.container}>
        <AnimatedSection animation="fadeInUp">
          <div className={styles.header}>
            <span className={styles.label}>Features</span>
            <h2 className={styles.title}>Everything You Need</h2>
            <p className={styles.description}>
              Built for modern developers who demand performance, type safety, and flexibility.
            </p>
          </div>
        </AnimatedSection>
        
        <StaggerContainer staggerDelay={0.1}>
          <BentoGrid columns={3} gap="16px">
            {features.map((feature, index) => (
              <BentoItem key={index} colSpan={feature.size} rowSpan={1}>
                <GlassCard
                  title={feature.title}
                  description={feature.description}
                  icon={<span style={{ fontSize: '20px' }}>{feature.icon}</span>}
                  variant="default"
                  glowOnHover={true}
                  className={styles.featureCard}
                >
                  {feature.tag && (
                    <div className={styles.tag}>
                      <Tag label={feature.tag} variant={feature.tagVariant} />
                    </div>
                  )}
                </GlassCard>
              </BentoItem>
            ))}
          </BentoGrid>
        </StaggerContainer>
      </div>
    </section>
  );
}
