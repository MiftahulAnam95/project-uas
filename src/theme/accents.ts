/**
 * Palet aksen per bab. Tiap bab mendapat "warna identitas" sendiri supaya
 * daftar bab, kartu kurikulum, dan header terasa hidup namun tetap rapi.
 * Semua kelas ditulis literal agar terdeteksi oleh Tailwind.
 */
export type AccentKey =
  | 'indigo'
  | 'violet'
  | 'sky'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'cyan'
  | 'fuchsia'
  | 'teal';

export interface Accent {
  key: AccentKey;
  /** Teks aksen */
  text: string;
  /** Latar lembut + tepi untuk chip */
  chip: string;
  /** Latar ikon (gradasi) */
  iconTile: string;
  /** Warna solid untuk nomor / penanda */
  solid: string;
  /** Gradasi untuk bar / strip */
  bar: string;
  /** Warna hex utama (untuk SVG / inline style) */
  hex: string;
  /** Warna hex pendamping gradasi */
  hex2: string;
}

export const ACCENTS: Record<AccentKey, Accent> = {
  indigo: {
    key: 'indigo',
    text: 'text-indigo-700',
    chip: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    iconTile: 'from-indigo-500 to-blue-500',
    solid: 'bg-indigo-600 text-white',
    bar: 'from-indigo-500 to-blue-400',
    hex: '#4f46e5',
    hex2: '#3b82f6',
  },
  violet: {
    key: 'violet',
    text: 'text-violet-700',
    chip: 'bg-violet-50 text-violet-700 border-violet-200',
    iconTile: 'from-violet-500 to-fuchsia-500',
    solid: 'bg-violet-600 text-white',
    bar: 'from-violet-500 to-fuchsia-400',
    hex: '#7c3aed',
    hex2: '#d946ef',
  },
  sky: {
    key: 'sky',
    text: 'text-sky-700',
    chip: 'bg-sky-50 text-sky-700 border-sky-200',
    iconTile: 'from-sky-500 to-cyan-400',
    solid: 'bg-sky-600 text-white',
    bar: 'from-sky-500 to-cyan-400',
    hex: '#0284c7',
    hex2: '#22d3ee',
  },
  emerald: {
    key: 'emerald',
    text: 'text-emerald-700',
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconTile: 'from-emerald-500 to-teal-400',
    solid: 'bg-emerald-600 text-white',
    bar: 'from-emerald-500 to-teal-400',
    hex: '#059669',
    hex2: '#2dd4bf',
  },
  amber: {
    key: 'amber',
    text: 'text-amber-700',
    chip: 'bg-amber-50 text-amber-800 border-amber-200',
    iconTile: 'from-amber-500 to-orange-400',
    solid: 'bg-amber-500 text-white',
    bar: 'from-amber-500 to-orange-400',
    hex: '#d97706',
    hex2: '#fb923c',
  },
  rose: {
    key: 'rose',
    text: 'text-rose-700',
    chip: 'bg-rose-50 text-rose-700 border-rose-200',
    iconTile: 'from-rose-500 to-pink-500',
    solid: 'bg-rose-600 text-white',
    bar: 'from-rose-500 to-pink-400',
    hex: '#e11d48',
    hex2: '#ec4899',
  },
  cyan: {
    key: 'cyan',
    text: 'text-cyan-700',
    chip: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    iconTile: 'from-cyan-500 to-sky-400',
    solid: 'bg-cyan-600 text-white',
    bar: 'from-cyan-500 to-sky-400',
    hex: '#0891b2',
    hex2: '#38bdf8',
  },
  fuchsia: {
    key: 'fuchsia',
    text: 'text-fuchsia-700',
    chip: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    iconTile: 'from-fuchsia-500 to-purple-500',
    solid: 'bg-fuchsia-600 text-white',
    bar: 'from-fuchsia-500 to-purple-400',
    hex: '#c026d3',
    hex2: '#a855f7',
  },
  teal: {
    key: 'teal',
    text: 'text-teal-700',
    chip: 'bg-teal-50 text-teal-700 border-teal-200',
    iconTile: 'from-teal-500 to-emerald-400',
    solid: 'bg-teal-600 text-white',
    bar: 'from-teal-500 to-emerald-400',
    hex: '#0d9488',
    hex2: '#34d399',
  },
};

const CYCLE: AccentKey[] = [
  'indigo',
  'violet',
  'sky',
  'emerald',
  'amber',
  'rose',
  'cyan',
  'fuchsia',
  'teal',
];

/** Ambil aksen berdasar nomor bab (1-based) — berputar agar variatif. */
export function accentForChapter(number: number): Accent {
  return ACCENTS[CYCLE[(number - 1) % CYCLE.length]];
}

export function accentByKey(key: AccentKey): Accent {
  return ACCENTS[key];
}
