import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import GlassCard from '../GlassCard';
import AmbientGlow from '../AmbientGlow';
import AnimatedSection from '../AnimatedSection';
import Tag from '../Tag';

interface DocField {
  name: string;
  type: string;
  kind?: 'pure' | 'relation' | 'related';
}

interface Doc {
  icon: string;
  name: string;
  fields: DocField[];
}

const docs: Doc[] = [
  {
    icon: '🌍',
    name: 'country',
    fields: [
      { name: '_id', type: 'ObjectId', kind: 'pure' },
      { name: 'name', type: 'string', kind: 'pure' },
      { name: 'population', type: 'number', kind: 'pure' },
      { name: 'abb', type: 'string', kind: 'pure' },
      { name: 'cities', type: 'City[]', kind: 'related' },
      { name: 'mostPopulousCities', type: 'City[]', kind: 'related' },
    ],
  },
  {
    icon: '🏙️',
    name: 'city',
    fields: [
      { name: '_id', type: 'ObjectId', kind: 'pure' },
      { name: 'name', type: 'string', kind: 'pure' },
      { name: 'population', type: 'number', kind: 'pure' },
      { name: 'abb', type: 'string', kind: 'pure' },
      { name: 'country', type: 'Country', kind: 'relation' },
      { name: 'users', type: 'User[]', kind: 'related' },
    ],
  },
  {
    icon: '👤',
    name: 'user',
    fields: [
      { name: '_id', type: 'ObjectId', kind: 'pure' },
      { name: 'name', type: 'string', kind: 'pure' },
      { name: 'age', type: 'number', kind: 'pure' },
      { name: 'country', type: 'Country', kind: 'relation' },
      { name: 'city', type: 'City', kind: 'relation' },
    ],
  },
];

function DocCard({ doc }: { doc: Doc }): JSX.Element {
  return (
    <div className={styles.docCard}>
      <div className={styles.docHeader}>
        <span className={styles.docIcon}>{doc.icon}</span>
        <span className={styles.docName}>{doc.name}</span>
      </div>
      {doc.fields.map((field) => (
        <div key={field.name} className={`${styles.docField} ${styles[field.kind ?? 'pure']}`}>
          {field.name}
          <span className={styles.fieldType}>{field.type}</span>
        </div>
      ))}
    </div>
  );
}

function Connection({ label }: { label: string }): JSX.Element {
  return (
    <div className={styles.connection}>
      <div className={styles.connectionLine} />
      <span className={styles.connectionLabel}>{label}</span>
    </div>
  );
}

const compareData = [
  {
    icon: '🗄️',
    variant: 'default' as const,
    title: 'SQL',
    items: [
      'Only a single foreign key connects the two sides',
      'Each side lives independently — no shared data',
      'Deleting a referenced row just throws an error',
      'Side effects of a relation are hidden, not visible',
    ],
  },
  {
    icon: '📄',
    variant: 'default' as const,
    title: 'NoSQL (naive)',
    items: [
      'Embedding is a one-way street — data goes stale',
      'You hand-write sync logic on every insert/update/delete',
      'No management of deletions on either side',
      'You maintain pagination windows yourself',
    ],
  },
  {
    icon: '🔄',
    variant: 'gradient-border' as const,
    title: 'Lesan',
    items: [
      'Both sides embed a pure snapshot of each other',
      'Insert, update, delete and re-limit are fully automatic',
      'Dependent deletes are blocked or cascade recursively',
      'Every side effect is visible at the definition point',
    ],
  },
];

const features = [
  {
    icon: '🔁',
    title: 'Define Once, Both Sides',
    description:
      'Declare a relation from the important side, and Lesan builds the embedded snapshot on both documents — no extra code to keep them in sync.',
  },
  {
    icon: '📥',
    title: 'One Query, Full Data',
    description:
      'Because relations live inside the document, a country arrives with its cities, its most populous cities, and its users already embedded. One request, not three.',
  },
  {
    icon: '⚖️',
    title: 'Explicit Side Effects',
    description:
      'Each relatedRelations block spells out exactly what happens on the other side — limits, sorts, and cascading deletes. Nothing is hidden.',
  },
];

export default function RelationshipsSection(): JSX.Element {
  return (
    <section className={styles.section}>
      <AmbientGlow
        color="purple"
        size={700}
        top="10%"
        right="-10%"
        intensity={0.1}
        animate={true}
      />
      <AmbientGlow
        color="cyan"
        size={600}
        bottom="5%"
        left="-10%"
        intensity={0.08}
        animate={true}
      />

      <div className={styles.container}>
        <AnimatedSection animation="fadeInUp">
          <div className={styles.header}>
            <span className={styles.label}>The Core Concept</span>
            <h2 className={styles.title}>
              Relationships That Think <span className={styles.gradient}>for Themselves</span>
            </h2>
            <p className={styles.description}>
              Lesan's relationship engine is the heart of the framework. Define a relation once, and both
              sides stay in perfect sync — automatically. No SQL joins, no hand-written embedding logic,
              no stale denormalized copies.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={0.15}>
          <div className={styles.diagram}>
            <DocCard doc={docs[0]} />
            <Connection label="embed ↔ embed" />
            <DocCard doc={docs[1]} />
            <Connection label="embed ↔ embed" />
            <DocCard doc={docs[2]} />
          </div>
        </AnimatedSection>

        <div className={styles.compareGrid}>
          {compareData.map((compare, index) => (
            <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
              <GlassCard
                className={styles.compareCard}
                variant={compare.variant}
                glowOnHover={true}
              >
                <h3 className={styles.compareTitle}>
                  <span style={{ fontSize: '20px' }}>{compare.icon}</span>
                  {compare.title}
                </h3>
                <ul className={styles.compareList}>
                  {compare.items.map((item, itemIndex) => (
                    <li key={itemIndex} className={styles.compareItem}>
                      <span className={styles.compareItemIcon}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={compare.variant === 'gradient-border' ? '#22D3EE' : '#52525B'}
                          strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <span style={{ fontSize: '18px' }}>{feature.icon}</span>
                </div>
                <div className={styles.featureText}>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fadeInUp" delay={0.2}>
          <div className={styles.tags} style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Tag label="Bi-Directional" variant="cyan" />
            <Tag label="Automatic Sync" variant="purple" />
            <Tag label="Cascade Deletes" variant="emerald" />
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={0.3}>
          <div className={styles.cta}>
            <a href={useBaseUrl('/docs/concepts/what-is-the-relationship')} className={styles.btnPrimary}>
              Deep Dive Into Relationships
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
