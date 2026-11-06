import React, { useMemo } from 'react';
import { GLOSSARY_TERMS } from '../../data/glossary';

interface GlossaryTextProps {
  text: string;
  className?: string;
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Menampilkan teks dengan markdown sederhana (teks `kode` dan **tebal**),
 * sekaligus membungkus istilah glosarium dengan tooltip saat disorot.
 */
export const GlossaryText: React.FC<GlossaryTextProps> = ({ text, className = '' }) => {
  const terms = useMemo(
    () =>
      [...GLOSSARY_TERMS]
        .sort((a, b) => b.term.length - a.term.length)
        .map((term) => ({ term: term.term, definition: term.simpleDefinition })),
    []
  );

  const pattern = useMemo(() => {
    if (!terms.length) return null;
    return new RegExp(`(${terms.map((t) => escapeRegExp(t.term)).join('|')})`, 'g');
  }, [terms]);

  const applyGlossary = (plain: string) => {
    if (!pattern) return [plain];
    const pieces = plain.split(pattern);
    return pieces.map((piece, index) => {
      const found = terms.find((t) => t.term === piece);
      if (!found) return piece;
      return (
        <span
          key={`${piece}-${index}`}
          className="glossary-term"
          data-tip={found.definition}
          title={found.definition}
          tabIndex={0}
          role="note"
          aria-label={`${piece}: ${found.definition}`}
        >
          {piece}
        </span>
      );
    });
  };

  const renderPlain = (plain: string, keyPrefix: string) =>
    applyGlossary(plain).map((node, index) => (
      <React.Fragment key={`${keyPrefix}-${index}`}>{node}</React.Fragment>
    ));

  const render = (value: string, keyPrefix = 't'): React.ReactNode[] => {
    const tokens = value.split(/(```[\s\S]*?```|`[^`]+`|\*\*[^*]+\*\*)/g);
    return tokens.map((token, index) => {
      if (!token) return null;
      if (token.startsWith('```') && token.endsWith('```') && token.length >= 6) {
        const code = token.slice(3, -3).replace(/^[a-zA-Z]+\n/, '').trim();
        return (
          <pre
            key={`${keyPrefix}-block-${index}`}
            className="my-2 overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-950 p-3 font-mono text-[11px] leading-relaxed text-emerald-200 sm:text-xs"
          >
            <code>{code}</code>
          </pre>
        );
      }
      if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
        return (
          <code
            key={`${keyPrefix}-code-${index}`}
            className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800"
          >
            {token.slice(1, -1)}
          </code>
        );
      }
      if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
        return (
          <strong key={`${keyPrefix}-bold-${index}`} className="font-extrabold text-slate-900">
            {render(token.slice(2, -2), `${keyPrefix}-b-${index}`)}
          </strong>
        );
      }
      return <React.Fragment key={`${keyPrefix}-plain-${index}`}>{renderPlain(token, `${keyPrefix}-p-${index}`)}</React.Fragment>;
    });
  };

  return <span className={className}>{render(text)}</span>;
};

export default GlossaryText;
