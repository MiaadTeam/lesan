import React from 'react';
import styles from './styles.module.css';
import GlassCard from '../GlassCard';
import AnimatedSection from '../AnimatedSection';
import Tag from '../Tag';

export default function TrustSection(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimatedSection animation="fadeInUp">
          <div className={styles.header}>
            <span className={styles.label}>Trusted By Developers</span>
            <h2 className={styles.title}>Production Ready</h2>
            <p className={styles.description}>
              Built with modern best practices and trusted by developers worldwide.
            </p>
          </div>
        </AnimatedSection>
        
        <div className={styles.grid}>
          <AnimatedSection animation="fadeInUp" delay={0}>
            <GlassCard className={styles.card} glowOnHover={true}>
              <div className={styles.stat}>
                <div className={styles.statIcon}>⭐</div>
                <div className={styles.statValue}>2.5k+</div>
                <div className={styles.statLabel}>GitHub Stars</div>
              </div>
            </GlassCard>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <GlassCard className={styles.card} glowOnHover={true}>
              <div className={styles.stat}>
                <div className={styles.statIcon}>📦</div>
                <div className={styles.statValue}>50k+</div>
                <div className={styles.statLabel}>Weekly Downloads</div>
              </div>
            </GlassCard>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <GlassCard className={styles.card} glowOnHover={true}>
              <div className={styles.stat}>
                <div className={styles.statIcon}>🏢</div>
                <div className={styles.statValue}>100+</div>
                <div className={styles.statLabel}>Companies Using</div>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
        
        <AnimatedSection animation="fadeIn" delay={0.3}>
          <div className={styles.platforms}>
            <span className={styles.platformsLabel}>Works on</span>
            <div className={styles.platformTags}>
              <Tag label="Node.js 18+" variant="default" />
              <Tag label="Bun 1.0+" variant="default" />
              <Tag label="Deno 1.37+" variant="default" />
              <Tag label="TypeScript 5.0+" variant="cyan" />
            </div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="fadeIn" delay={0.4}>
          <div className={styles.githubCta}>
            <a 
              href="https://github.com/MiaadTeam/lesan" 
              className={styles.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Star on GitHub
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
