import React, { useState } from 'react';
import { Copy, Check, Play, ChevronDown, ChevronUp, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { LineExplanation } from '../../types';
import { executePythonCode } from '../../utils/pythonRunner';

interface CodeBlockProps {
  code: string;
  filename?: string;
  title?: string;
  explanation?: string;
  output?: string;
  lineExplanations?: LineExplanation[];
  highlightLines?: number[];
  isSimulated?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  filename,
  title,
  explanation,
  output,
  lineExplanations,
  highlightLines = [],
  isSimulated = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [showLineByLine, setShowLineByLine] = useState(false);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [customOutput, setCustomOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const lines = code.trim().split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      if (isSimulated && output) {
        setCustomOutput(output);
      } else {
        const res = executePythonCode(code);
        if (res.hasError) {
          setCustomOutput(res.error || 'Terjadi kesalahan eksekusi.');
        } else {
          setCustomOutput(res.output || '(Tidak ada output yang dicetak)');
        }
      }
      setIsRunning(false);
    }, 250);
  };

  const activeOutput = customOutput !== null ? customOutput : output;

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900 shadow-xl overflow-hidden my-6">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="font-mono text-slate-400 font-medium tracking-wide">
            {filename || 'program.py'}
          </span>
          {title && (
            <span className="hidden sm:inline-block text-slate-500 border-l border-slate-700/80 pl-3">
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {lineExplanations && lineExplanations.length > 0 && (
            <button
              onClick={() => setShowLineByLine(!showLineByLine)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                showLineByLine
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title="Lihat penjelasan per baris"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Penjelasan Per Baris</span>
              {showLineByLine ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-md text-xs font-semibold shadow-xs transition active:scale-95 disabled:opacity-50"
            title="Jalankan contoh kode ini"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isRunning ? 'Menjalankan...' : 'Jalankan'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs transition active:scale-95"
            title="Salin kode ke papan klip"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Text Area */}
      <div className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-slate-200">
        <pre className="m-0">
          <code>
            {lines.map((lineText, idx) => {
              const lineNum = idx + 1;
              const isHighlighted = highlightLines.includes(lineNum);
              const lineExpl = lineExplanations?.find((e) => e.line === lineNum);
              const isSelected = selectedLine === lineNum;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (lineExpl) {
                      setSelectedLine(isSelected ? null : lineNum);
                    }
                  }}
                  className={`flex items-start group rounded transition-colors px-1 py-0.5 ${
                    isHighlighted ? 'bg-indigo-950/60 border-l-2 border-indigo-400' : ''
                  } ${
                    isSelected ? 'bg-indigo-900/40 border-l-2 border-indigo-400' : ''
                  } ${
                    lineExpl ? 'cursor-pointer hover:bg-slate-800/70' : ''
                  }`}
                >
                  <span className="select-none text-slate-600 w-8 text-right pr-4 text-xs shrink-0 font-normal group-hover:text-slate-400">
                    {lineNum}
                  </span>
                  <span className="flex-1 whitespace-pre">{highlightSyntax(lineText)}</span>
                  {lineExpl && showLineByLine && (
                    <span className="ml-2 text-xs text-indigo-400/80 bg-indigo-950/60 border border-indigo-800/40 px-1.5 py-0.5 rounded select-none shrink-0 hidden sm:inline-block">
                      klik untuk info
                    </span>
                  )}
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Interactive Line-by-Line Popover Explanation */}
      {selectedLine && lineExplanations && (
        <div className="bg-indigo-950/90 border-t border-indigo-800/60 p-4 text-sm text-indigo-100 flex items-start gap-3 animate-in fade-in duration-150">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-indigo-300 text-xs">
              Penjelasan Baris {selectedLine}:
            </div>
            <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
              {lineExplanations.find((e) => e.line === selectedLine)?.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Code General Explanation (Part B) */}
      {explanation && (
        <div className="bg-slate-950/60 border-t border-slate-800/80 px-4 py-3 text-xs sm:text-sm text-slate-300">
          <div className="font-semibold text-indigo-300 text-xs mb-1 uppercase tracking-wider">
            Penjelasan:
          </div>
          <p className="leading-relaxed text-slate-300">{explanation}</p>
        </div>
      )}

      {/* Terminal Output Area (Part C) */}
      {activeOutput && (
        <div className="border-t border-slate-800 bg-black/90 p-4 text-xs font-mono">
          <div className="flex items-center justify-between text-slate-500 mb-2 select-none">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wide">
              <TerminalIcon className="w-3.5 h-3.5" />
              HASIL OUTPUT PROGRAM:
            </span>
            <span className="text-slate-600 text-[10px]">
              {isSimulated ? 'Simulasi Output' : 'Python Runtime Output'}
            </span>
          </div>
          <pre className="text-emerald-300/90 whitespace-pre-wrap leading-relaxed select-text overflow-x-auto bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
            {activeOutput}
          </pre>
        </div>
      )}
    </div>
  );
};

// Syntax highlighting parser
function highlightSyntax(line: string): React.ReactNode {
  // Comments
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

function renderTokens(text: string): React.ReactNode {
  // Regex tokenization for keywords, strings, numbers, builtins
  const tokenRegex =
    /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:def|return|if|elif|else|while|for|in|import|from|as|global|break|continue|and|or|not|is|None|True|False)\b|\b(?:print|input|int|str|float|len|range|append|replace|strip|capitalize|isdigit|items)\b|\b\d+\b|[+\-*/%=><!&|^~]+|[a-zA-Z_]\w*|[^\s\w]+|\s+)/g;

  const matches = text.match(tokenRegex);
  if (!matches) return text;

  const keywords = new Set([
    'def', 'return', 'if', 'elif', 'else', 'while', 'for', 'in', 'import', 'from', 'as', 'global', 'break', 'continue', 'and', 'or', 'not', 'is', 'None', 'True', 'False',
  ]);
  const builtins = new Set([
    'print', 'input', 'int', 'str', 'float', 'len', 'range', 'append', 'replace', 'strip', 'capitalize', 'isdigit', 'items',
  ]);

  return matches.map((token, i) => {
    if (token.startsWith('"') || token.startsWith("'")) {
      return (
        <span key={i} className="code-token-string">
          {token}
        </span>
      );
    }
    if (keywords.has(token)) {
      return (
        <span key={i} className="code-token-keyword">
          {token}
        </span>
      );
    }
    if (builtins.has(token)) {
      return (
        <span key={i} className="code-token-builtin">
          {token}
        </span>
      );
    }
    if (/^\d+$/.test(token)) {
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
    return <span key={i}>{token}</span>;
  });
}
