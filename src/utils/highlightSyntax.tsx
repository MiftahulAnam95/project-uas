import React from 'react';

/**
 * Pewarna sintaks Python ringan (tanpa dependensi eksternal).
 * Dipakai oleh CodeBlock besar maupun potongan kode mini di latihan.
 */

const KEYWORDS = new Set([
  'def', 'return', 'if', 'elif', 'else', 'while', 'for', 'in', 'import', 'from',
  'as', 'global', 'break', 'continue', 'and', 'or', 'not', 'is', 'None', 'True',
  'False', 'try', 'except', 'finally', 'with', 'lambda', 'pass', 'del', 'class',
]);

const BUILTINS = new Set([
  'print', 'input', 'int', 'str', 'float', 'len', 'range', 'append', 'replace',
  'strip', 'capitalize', 'isdigit', 'items', 'round', 'abs', 'sum', 'sorted',
  'format', 'lower', 'upper', 'title', 'keys', 'values', 'remove', 'pop',
]);

const TOKEN_REGEX =
  /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|f"(?:\\.|[^"\\])*"|f'(?:\\.|[^'\\])*'|\b(?:def|return|if|elif|else|while|for|in|import|from|as|global|break|continue|and|or|not|is|None|True|False|try|except|finally|with|lambda|pass|del|class)\b|\b(?:print|input|int|str|float|len|range|append|replace|strip|capitalize|isdigit|items|round|abs|sum|sorted|format|lower|upper|title|keys|values|remove|pop)\b|\b\d+(?:\.\d+)?\b|[+\-*/%=><!&|^~]+|[a-zA-Z_]\w*|[^\s\w]+|\s+)/g;

function renderTokens(text: string): React.ReactNode {
  const matches = text.match(TOKEN_REGEX);
  if (!matches) return text;

  return matches.map((token, i) => {
    if (token.startsWith('"') || token.startsWith("'")) {
      return (
        <span key={i} className="code-token-string">
          {token}
        </span>
      );
    }
    if (KEYWORDS.has(token)) {
      return (
        <span key={i} className="code-token-keyword">
          {token}
        </span>
      );
    }
    if (BUILTINS.has(token)) {
      return (
        <span key={i} className="code-token-builtin">
          {token}
        </span>
      );
    }
    if (/^\d+(\.\d+)?$/.test(token)) {
      return (
        <span key={i} className="code-token-number">
          {token}
        </span>
      );
    }
    if (/^[+\-*/%=><!&|^~]+$/.test(token)) {
      return (
        <span key={i} className="code-token-operator">
          {token}
        </span>
      );
    }
    return (
      <span key={i} className="code-token-variable">
        {token}
      </span>
    );
  });
}

/** Warnai satu baris kode Python. */
export function highlightSyntax(line: string): React.ReactNode {
  const commentIdx = line.indexOf('#');
  if (commentIdx !== -1) {
    const codePart = line.slice(0, commentIdx);
    const commentPart = line.slice(commentIdx);
    return (
      <>
        {renderTokens(codePart)}
        <span className="code-token-comment">{commentPart}</span>
      </>
    );
  }
  return renderTokens(line);
}

/** Warnai seluruh blok kode (multi-baris). */
export function highlightCode(code: string): React.ReactNode[] {
  return code.replace(/\t/g, '    ').split('\n').map((line, idx) => (
    <span key={idx} className="block whitespace-pre">
      {highlightSyntax(line)}
    </span>
  ));
}
