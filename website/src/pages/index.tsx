import React from 'react';
import Layout from '@theme/Layout';
import HeroSection from '@site/src/components/HeroSection';
import FeaturesSection from '@site/src/components/FeaturesSection';
import RelationshipsSection from '@site/src/components/RelationshipsSection';
import PerformanceSection from '@site/src/components/PerformanceSection';
import CodeExampleSection from '@site/src/components/CodeExampleSection';
import TrustSection from '@site/src/components/TrustSection';
import ShowcaseSection from '@site/src/components/ShowcaseSection';
import CTASection from '@site/src/components/CTASection';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Lesan - The New Way to Build Web Servers"
      description="GraphQL-like flexibility with unmatched performance. Client-driven projections, automatic relationships, end-to-end TypeScript safety.">
      <main>
        <HeroSection />
        <FeaturesSection />
        <RelationshipsSection />
        <PerformanceSection />
        <CodeExampleSection />
        <TrustSection />
        <ShowcaseSection />
        <CTASection />
      </main>
    </Layout>
  );
}
