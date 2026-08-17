import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import GlassCard from '../GlassCard';
import AnimatedSection from '../AnimatedSection';
import Tag from '../Tag';

const facts = [
  { icon: '🗂️', value: '15', label: 'Data Models' },
  { icon: '⚡', value: '98', label: 'Actions (Acts)' },
  { icon: '🌍', value: '9', label: 'Languages' },
  { icon: '🛡️', value: 'RBAC', label: 'JWT Auth' },
];

export default function ShowcaseSection(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimatedSection animation="fadeInUp">
          <div className={styles.header}>
            <span className={styles.label}>Real-World Showcase</span>
            <h2 className={styles.title}>Built with Lesan</h2>
            <p className={styles.description}>
              Lesan isn't just a framework — it's already powering production applications.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={0.1}>
          <GlassCard className={styles.card} variant="gradient-border" glowOnHover={true}>
            <div className={styles.cardInner}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleWrap}>
                  <h3 className={styles.cardTitle}>ZiWound</h3>
                  <div className={styles.cardLinks}>
                    <a
                      href="https://github.com/hemedani/ziwound"
                      className={styles.cardLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub ↗
                    </a>
                    <a
                      href="https://ziwound.com/en"
                      className={styles.cardLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ziwound.com ↗
                    </a>
                  </div>
                </div>
                <div className={styles.tags}>
                  <Tag label="Deno" variant="default" />
                  <Tag label="Next.js" variant="default" />
                  <Tag label="MongoDB" variant="emerald" />
                  <Tag label="TypeScript" variant="cyan" />
                </div>
              </div>

              <p className={styles.cardDescription}>
                A full-stack <strong>war crimes documentation platform</strong> built entirely with Lesan —
                a serious, production-grade application demonstrating Lesan at scale. Users submit
                reports with geolocation and file attachments, explore documented incidents through
                interactive maps, read blog articles, and admins manage everything from a full dashboard.
              </p>

              <p className={styles.cardDescription}>
                ZiWound is <strong>open source</strong> — the entire codebase is on GitHub, so you can
                read the real models, acts, and utilities to see how Lesan powers a production app.
              </p>

              <div className={styles.facts}>
                {facts.map((f) => (
                  <div key={f.label} className={styles.fact}>
                    <div className={styles.factIcon}>{f.icon}</div>
                    <div className={styles.factValue}>{f.value}</div>
                    <div className={styles.factLabel}>{f.label}</div>
                  </div>
                ))}
              </div>

              <div className={styles.highlights}>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🔗</span>
                  <span>
                    <strong>Rich relations</strong> — reports link to reporters, documents, tags,
                    categories, and locations, with reverse relations synced automatically
                  </span>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🗺️</span>
                  <span>
                    <strong>GeoJSON &amp; maps</strong> — native MongoDB geospatial queries power the
                    MapLibre GL + Leaflet interactive map
                  </span>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🌐</span>
                  <span>
                    <strong>9 languages</strong> — full RTL/LTR flipping (Persian, Arabic, English, and more)
                  </span>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🔐</span>
                  <span>
                    <strong>JWT auth &amp; RBAC</strong> — role-based access (Ghost, Manager, Editor, Ordinary)
                  </span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <a href={useBaseUrl('/docs/category/ziwound-case-study')} className={styles.btn}>
                  Read the full story in the docs
                </a>
                <span className={styles.footnote}>
                  Every model, act, and relation above runs on Lesan's generated TypeScript types.
                </span>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
