import React from 'react';
import SolidarityBanner from '@site/src/components/SolidarityBanner';

export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <SolidarityBanner />
      {children}
    </>
  );
}