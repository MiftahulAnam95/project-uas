import React, { useState } from 'react';
import {
  Copy,
  Check,
  Play,
  ChevronDown,
  ChevronUp,
  Terminal as TerminalIcon,
  Sparkles,
  FileCode2,
  Loader2,
  Info,
} from 'lucide-react';
import { LineExplanation } from '../../types';
import { executePythonCode } from '../../utils/pythonRunner';
import { cn } from '../../utils/cn';
import { highlightSyntax } from '../../utils/highlightSyntax';

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

/** Jendela kode bergaya editor: bisa dijalankan, disalin, dan dibedah per baris. */
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
  const explorableCount = lineExplanations?.length ?? 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard tidak tersedia — abaikan dengan tenang
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
  const isErrorOutput =
    !!activeOutput &&
    /Traceback|Error|error:|Exception/i.test(activeOutput.split('\n')[0] || '');

  return (
    <figure className="group/code my-6 overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-950 shadow-[0_28px_60px_-30px_rgba(2,6,23,0.85)] transition-shadow duration-300 hover:shadow-[0_32px_70px_-28px_rgba(74,60,170,0.55)]">
      {/* Pita gradasi tipis */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-brand-400/70 to-transparent"
      />

      {/* ---------- Bar kepala editor ---------- */}
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-900/60 px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/85 transition-colors group-hover/code:bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/85 transition-colors group-hover/code:bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/85 transition-colors group-hover/code:bg-emerald-400" />
          </div>
          <span className="flex min-w-0 items-center gap-1.5">
            <FileCode2 className="h-3.5 w-3.5 shrink-0 text-brand-400" />
            <span className="truncate font-mono text-xs font-semibold text-slate-300">
              {filename || 'program.py'}
            </span>
          </span>
          {title && (
            <span className="hidden truncate border-l border-slate-700/70 pl-3 text-[11px] text-slate-500 sm:inline-block">
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {explorableCount > 0 && (
            <button
              type="button"
              onClick={() => setShowLineByLine(!showLineByLine)}
              className={cn(
                'flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold transition',
                showLineByLine
                  ? 'border-brand-400/50 bg-brand-500/20 text-brand-200'
                  : 'border-slate-700 bg-slate-800/70 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
              )}
              title="Lihat penjelasan per baris"
              aria-expanded={showLineByLine}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Bedah Per Baris</span>
              <span className="rounded-full bg-slate-950/60 px-1.5 text-[10px] tabular">
                {explorableCount}
              </span>
              {showLineByLine ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 px-3 py-1 text-[11px] font-extrabold text-slate-950 shadow-[0_8px_18px_-8px_rgba(16,185,129,0.9)] transition hover:brightness-110 active:scale-95 disabled:cursor-wait disabled:opacity-70"
            title="Jalankan contoh kode ini"
          >
            {isRunning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3 w-3 fill-current" />
            )}
            <span>{isRunning ? 'Menjalankan…' : 'Jalankan'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold transition active:scale-95',
              copied
                ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-300'
                : 'border-slate-700 bg-slate-800/70 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
            )}
            title="Salin kode ke papan klip"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Salin</span>
              </>
            )}
          </button>
        </div>
      </figcaption>

      {/* ---------- Area kode ---------- */}
      <div className="code-scrollbar overflow-x-auto bg-[#0a0e1c] px-2 py-3 font-mono text-[13px] leading-relaxed text-slate-200 sm:px-3">
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
                    if (lineExpl) setSelectedLine(isSelected ? null : lineNum);
                  }}
                  className={cn(
                    'group/line -mx-2 flex items-start rounded-lg px-2 py-[3px] transition-colors sm:-mx-3 sm:px-3',
                    isHighlighted &&
                      'bg-gradient-to-r from-brand-500/20 via-brand-500/10 to-transparent shadow-[inset_2px_0_0_0_var(--color-brand-400)]',
                    isSelected &&
                      'bg-gradient-to-r from-aqua-400/20 via-aqua-400/5 to-transparent shadow-[inset_2px_0_0_0_var(--color-aqua-400)]',
                    lineExpl && !isSelected && 'cursor-pointer hover:bg-slate-800/60',
                    !isHighlighted && !isSelected && !lineExpl && 'hover:bg-slate-800/30'
                  )}
                  title={lineExpl && showLineByLine ? 'Klik untuk penjelasan baris ini' : undefined}
                >
                  <span
                    className={cn(
                      'w-8 shrink-0 select-none pr-4 text-right text-[11px] font-normal tabular transition-colors',
                      isSelected
                        ? 'text-aqua-300'
                        : isHighlighted
                        ? 'text-brand-300'
                        : 'text-slate-600 group-hover/line:text-slate-400'
                    )}
                  >
                    {lineNum}
                  </span>
                  <span className="flex-1 whitespace-pre">{highlightSyntax(lineText)}</span>
                  {lineExpl && showLineByLine && !isSelected && (
                    <span className="ml-2 hidden shrink-0 select-none items-center gap-1 rounded-md border border-brand-500/30 bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand-300 sm:inline-flex">
                      <Info className="h-3 w-3" />
                      klik
                    </span>
                  )}
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* ---------- Penjelasan baris terpilih ---------- */}
      {selectedLine && lineExplanations && (
        <div className="flex items-start gap-3 border-t border-brand-500/25 bg-gradient-to-r from-brand-950/80 to-slate-900/60 p-4 anim-rise">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-aqua-400 to-brand-500 text-white shadow-sm">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
          <div className="space-y-1">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-aqua-300">
              Penjelasan baris {selectedLine}
            </div>
            <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
              {lineExplanations.find((e) => e.line === selectedLine)?.explanation}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedLine(null)}
            className="ml-auto shrink-0 cursor-pointer rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
            aria-label="Tutup penjelasan baris"
          >
            Tutup
          </button>
        </div>
      )}

      {/* ---------- Penjelasan umum ---------- */}
      {explanation && (
        <div className="border-t border-slate-800 bg-slate-900/50 px-4 py-3.5">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-300">
            <Info className="h-3.5 w-3.5" />
            Penjelasan
          </div>
          <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">{explanation}</p>
        </div>
      )}

      {/* ---------- Output terminal ---------- */}
      {activeOutput && (
        <div className="border-t border-slate-800 bg-black/70 p-3 sm:p-4">
          <div className="mb-2 flex select-none items-center justify-between gap-2">
            <span
              className={cn(
                'flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em]',
                isErrorOutput ? 'text-rose-400' : 'text-emerald-400'
              )}
            >
              <TerminalIcon className="h-3.5 w-3.5" />
              Hasil output program
            </span>
            <span className="rounded-full border border-slate-700/70 bg-slate-900 px-2 py-0.5 font-mono text-[10px] text-slate-500">
              {isSimulated ? 'simulasi' : 'python runtime'}
            </span>
          </div>
          <pre
            className={cn(
              'code-scrollbar select-text overflow-x-auto whitespace-pre-wrap rounded-xl border bg-[#05070f] p-3 font-mono text-[11px] leading-relaxed sm:text-xs anim-fade',
              isErrorOutput
                ? 'border-rose-900/50 text-rose-300'
                : 'border-slate-800 text-emerald-300/95'
            )}
          >
            {activeOutput}
          </pre>
        </div>
      )}
    </figure>
  );
};

export default CodeBlock;
