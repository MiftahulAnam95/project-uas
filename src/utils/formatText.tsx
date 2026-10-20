import React from 'react';

const INLINE_TOKEN_REGEX =
  /\*\*([\s\S]+?)\*\*|`([^`\n]+)`|(?<!\*)\*(?!\s)([^*\n]+?)(?<!\s)\*(?!\*)/g;

/**
 * Mengubah penanda markdown sederhana (**tebal**, *miring*, dan `kode`)
 * di dalam teks menjadi elemen React tanpa meninggalkan tanda bintang/backtick mentah.
 */
export function formatInlineText(
  text: string | undefined | null,
  tone: 'light' | 'dark' = 'light'
): React.ReactNode {
  if (!text) return text;

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const regex = new RegExp(INLINE_TOKEN_REGEX.source, 'g');

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      nodes.push(
        <strong
          key={`b-${key++}`}
          className={
            tone === 'dark'
              ? 'font-bold text-white'
              : 'font-bold text-slate-900'
          }
        >
          {formatInlineText(match[1], tone)}
        </strong>
      );
    } else if (match[2] !== undefined) {
      nodes.push(
        <code
          key={`c-${key++}`}
          className={
            tone === 'dark'
              ? 'rounded-md border border-white/15 bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] font-semibold text-aqua-300'
              : 'rounded-md border border-slate-200/90 bg-slate-100/90 px-1.5 py-0.5 font-mono text-[0.9em] font-semibold text-brand-700'
          }
        >
          {match[2]}
        </code>
      );
    } else if (match[3] !== undefined) {
      nodes.push(
        <em key={`i-${key++}`} className="italic">
          {formatInlineText(match[3], tone)}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (nodes.length === 0) {
    return text;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
