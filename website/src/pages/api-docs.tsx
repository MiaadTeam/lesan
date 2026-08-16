import React, { useState, useCallback } from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './api-docs.module.css';
import AmbientGlow from '@site/src/components/AmbientGlow';
import AnimatedSection from '@site/src/components/AnimatedSection';
import GlassCard from '@site/src/components/GlassCard';
import BentoGrid, { BentoItem } from '@site/src/components/BentoGrid';
import TerminalBlock from '@site/src/components/TerminalBlock';
import Tag from '@site/src/components/Tag';

const CODE_EXAMPLE = `import { lesan } from "@hemedani/lesan";

// Define a model
const user = core.odm.newModel("user", {
  name: string(),
  email: string(),
});

// Create an action
const createUser = core.acts.setAct("user", "create", {
  validator: user.schemaInp(),
  fn: async ({ body }) => {
    return await user.insertOne(body);
  },
});

// Run the server
await core.runServer({ port: 1366 });`;

export default function ApiDocs(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const docsBase = useBaseUrl('/docs');

  const API_SECTIONS = [
    {
      title: 'Server API',
      description: 'Server setup, actions, context, and CORS configuration.',
      icon: '🖥️',
      href: `${docsBase}/api/server`,
      tag: 'Core',
    },
    {
      title: 'Models & ODM',
      description: 'Schemas, relations, CRUD operations, and hooks.',
      icon: '🗂️',
      href: `${docsBase}/api/models`,
      tag: 'Data',
    },
    {
      title: 'Queries & Projections',
      description: 'Client-driven projections, aggregation, and filtering.',
      icon: '🔍',
      href: `${docsBase}/api/queries`,
      tag: 'Query',
    },
    {
      title: 'Type System',
      description: 'Generated types, Superstruct integration, and inference.',
      icon: '🔷',
      href: `${docsBase}/api/types`,
      tag: 'Types',
    },
    {
      title: 'Cross-Platform',
      description: 'Node.js, Bun, and Deno support with runtime adapters.',
      icon: '🌐',
      href: `${docsBase}/api/platforms`,
      tag: 'Runtime',
    },
    {
      title: 'Quick Start',
      description: 'Get up and running with Lesan in 5 minutes.',
      icon: '🚀',
      href: `${docsBase}/intro`,
      tag: 'Guide',
    },
  ];

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      // Functional search will be integrated in Phase 6
    },
    []
  );

  return (
    <Layout
      title="API Reference — Lesan"
      description="Complete API documentation for the Lesan framework. Server, models, queries, types, and cross-platform guides.">
      <main className={styles.page}>
        {/* Ambient Glow Backgrounds */}
        <AmbientGlow
          color="cyan"
          size={700}
          top="5%"
          left="50%"
          intensity={0.12}
          animate={true}
        />
        <AmbientGlow
          color="purple"
          size={500}
          top="25%"
          right="5%"
          intensity={0.1}
          animate={true}
        />

        <div className={styles.container}>
          {/* Hero */}
          <section className={styles.hero}>
            <AnimatedSection animation="fadeInUp" delay={0}>
              <div className={styles.eyebrow}>
                <Tag label="v0.2.3" variant="cyan" />
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <h1 className={styles.title}>
                API <span className={styles.gradient}>Reference</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <p className={styles.subtitle}>
                Complete documentation for the Lesan framework.
                <br />
                Explore server APIs, models, queries, types, and cross-platform guides.
              </p>
            </AnimatedSection>

            {/* Search Bar */}
            <AnimatedSection animation="fadeInUp" delay={0.3}>
              <div className={styles.searchWrapper}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={styles.searchIcon}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search API documentation..."
                  className={styles.searchInput}
                  aria-label="Search API documentation"
                />
                <span className={styles.searchShortcut}>⌘K</span>
              </div>
            </AnimatedSection>
          </section>

          {/* Quick Nav Cards */}
          <section className={styles.section}>
            <AnimatedSection animation="fadeInUp" delay={0}>
              <div className={styles.sectionHeader}>
                <Tag label="Explore" variant="purple" />
                <h2 className={styles.sectionTitle}>API Sections</h2>
                <p className={styles.sectionSubtitle}>
                  Jump into any section of the API documentation.
                </p>
              </div>
            </AnimatedSection>

            <BentoGrid columns={3} gap="20px" className={styles.bento}>
              {API_SECTIONS.map((section, index) => (
                <BentoItem key={section.title} colSpan={1} rowSpan={1}>
                  <AnimatedSection
                    animation="fadeInUp"
                    delay={0.05 * index}
                    className={styles.bentoItemFull}>
                    <GlassCard
                      title={section.title}
                      description={section.description}
                      icon={
                        <span className={styles.cardIcon}>{section.icon}</span>
                      }
                      href={section.href}
                      glowOnHover={true}
                      variant="default"
                      className={styles.apiCard}>
                      <div className={styles.cardTag}>
                        <Tag label={section.tag} variant="default" />
                      </div>
                    </GlassCard>
                  </AnimatedSection>
                </BentoItem>
              ))}
            </BentoGrid>
          </section>

          {/* Code Example + Info */}
          <section className={styles.section}>
            <div className={styles.twoColumn}>
              <div className={styles.codeColumn}>
                <AnimatedSection animation="fadeInUp" delay={0}>
                  <div className={styles.sectionHeaderLeft}>
                    <Tag label="Example" variant="emerald" />
                    <h2 className={styles.sectionTitle}>Quick Start</h2>
                    <p className={styles.sectionSubtitle}>
                      Define models and actions in a few lines of code.
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeInUp" delay={0.1}>
                  <TerminalBlock
                    command={CODE_EXAMPLE}
                    language="typescript"
                    title="example.ts"
                  />
                </AnimatedSection>
              </div>

              <div className={styles.infoColumn}>
                <AnimatedSection animation="fadeInUp" delay={0.15}>
                  <div className={styles.infoCard}>
                    <h3 className={styles.infoTitle}>Installation</h3>
                    <p className={styles.infoText}>
                      Install Lesan via your preferred package manager.
                    </p>
                    <TerminalBlock
                      command="npm install @hemedani/lesan"
                      title="bash"
                    />
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeInUp" delay={0.25}>
                  <div className={styles.infoCard}>
                    <h3 className={styles.infoTitle}>Requirements</h3>
                    <ul className={styles.infoList}>
                      <li>
                        <span className={styles.check}>✓</span> Node.js 18+ / Bun
                        1.0+ / Deno 1.35+
                      </li>
                      <li>
                        <span className={styles.check}>✓</span> TypeScript 5.0+
                      </li>
                      <li>
                        <span className={styles.check}>✓</span> MongoDB 5.0+
                      </li>
                    </ul>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeInUp" delay={0.35}>
                  <div className={styles.infoCard}>
                    <h3 className={styles.infoTitle}>Latest Updates</h3>
                    <div className={styles.changelog}>
                      <div className={styles.changelogItem}>
                        <span className={styles.versionBadge}>v0.2.3</span>
                        <span className={styles.changelogText}>
                          New query engine, improved type inference, Deno Deploy
                          support.
                        </span>
                      </div>
                      <div className={styles.changelogItem}>
                        <span className={styles.versionBadge}>v1.9</span>
                        <span className={styles.changelogText}>
                          Bun adapter optimizations, relation hooks.
                        </span>
                      </div>
                    </div>
                    <a
                      href="https://github.com/MiaadTeam/lesan/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.changelogLink}>
                      View full changelog →
                    </a>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className={styles.ctaSection}>
            <AnimatedSection animation="fadeInUp" delay={0}>
              <div className={styles.ctaCard}>
                <AmbientGlow
                  color="cyan"
                  size={400}
                  top="50%"
                  left="50%"
                  intensity={0.08}
                  animate={true}
                  className={styles.ctaGlow}
                />
                <h2 className={styles.ctaTitle}>
                  Ready to dive deeper?
                </h2>
                <p className={styles.ctaText}>
                  Start with the Quick Start guide or explore the full API reference.
                </p>
                <div className={styles.ctaButtons}>
                  <a href={useBaseUrl('/docs/intro')} className={styles.btnPrimary}>
                    Get Started
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/MiaadTeam/lesan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnSecondary}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </section>
        </div>
      </main>
    </Layout>
  );
}
