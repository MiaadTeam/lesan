import React from 'react';
import styles from './styles.module.css';

export default function SolidarityBanner(): JSX.Element {
  return (
    <div className={styles.banner} role="note" aria-label="Solidarity banner">
      <p className={styles.title}>
        🇮🇷 Iran · 🇵🇸 Palestine · Hezbollah 🇱🇧
      </p>
      <p className={styles.text}>
        We support the axis of resistance — Iran, Palestine, Hezbollah in Lebanon, and all those
        who stand against the decades of suffering and crimes inflicted on the people of our
        region.
      </p>
    </div>
  );
}