import React, { useState, useCallback } from 'react';
import styles from './styles.module.css';

export interface TerminalBlockProps {
  command: string;
  language?: string;
  showLineNumbers?: boolean;
  output?: string;
  className?: string;
  title?: string;
}

export default function TerminalBlock({
  command,
  language = 'bash',
  showLineNumbers = false,
  output,
  className = '',
  title = 'terminal',
}: TerminalBlockProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [command]);

  const lines = command.split('\n');

  return (
    <div className={`${styles.terminal} ${className}`}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <span className={styles.title}>{title}</span>
        <button 
          className={styles.copyButton} 
          onClick={handleCopy}
          aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
      <div className={styles.content}>
        <pre className={styles.pre}>
          <code className={styles.code}>
            {lines.map((line, index) => (
              <div key={index} className={styles.line}>
                {showLineNumbers && (
                  <span className={styles.lineNumber}>{index + 1}</span>
                )}
                <span className={styles.lineContent}>{line}</span>
              </div>
            ))}
          </code>
        </pre>
        {output && (
          <div className={styles.output}>
            <div className={styles.outputDivider} />
            <pre className={styles.pre}>
              <code className={`${styles.code} ${styles.outputCode}`}>{output}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
