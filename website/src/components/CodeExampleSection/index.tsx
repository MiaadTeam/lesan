import React from 'react';
import styles from './styles.module.css';
import TerminalBlock from '../TerminalBlock';
import AnimatedSection from '../AnimatedSection';
import Tag from '../Tag';

const codeExample = `import { lesan } from "@hemedani/lesan";

// Define your model
const User = lesan.model("User", {
  name: "string",
  email: "string",
  posts: "relationship",
});

// Create server
const server = lesan.serve({
  port: 8080,
});

// Add routes
server.get("/users", async () => {
  return await User.find({
    projection: {
      name: 1,
      email: 1,
      "posts.title": 1,
    },
  });
});`;

export default function CodeExampleSection(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimatedSection animation="fadeInUp">
          <div className={styles.header}>
            <span className={styles.label}>Developer Experience</span>
            <h2 className={styles.title}>Write Less, Do More</h2>
            <p className={styles.description}>
              Intuitive API that feels natural and requires minimal boilerplate.
            </p>
          </div>
        </AnimatedSection>
        
        <div className={styles.content}>
          <AnimatedSection animation="fadeInLeft" className={styles.codeSide}>
            <TerminalBlock 
              command={codeExample}
              language="typescript"
              title="example.ts"
            />
          </AnimatedSection>
          
          <AnimatedSection animation="fadeInRight" delay={0.2} className={styles.infoSide}>
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <h4>Client-Driven Projections</h4>
                  <p>Fetch only the fields you need, reducing payload size and improving performance.</p>
                </div>
              </div>
              
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <h4>Auto Relations</h4>
                  <p>Bi-directional relationships are handled automatically. No manual foreign keys.</p>
                </div>
              </div>
              
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <h4>Type Safe</h4>
                  <p>Full TypeScript support with automatic type inference from your models.</p>
                </div>
              </div>
            </div>
            
            <div className={styles.tags}>
              <Tag label="TypeScript" variant="cyan" />
              <Tag label="MongoDB" variant="emerald" />
              <Tag label="Zero Config" variant="purple" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
