import { Chapter } from '../types';
import { CHAPTERS as BASE_CHAPTERS } from './lessonsBase';
import { bab3 } from './enhancements/bab3';
import { bab4 } from './enhancements/bab4';
import { bab5 } from './enhancements/bab5';
import { bab6 } from './enhancements/bab6';
import { bab7to11 } from './enhancements/bab7to11';
import { TAMPILAN_CHAPTER } from './enhancements/tampilan';

/**
 * Lapisan materi hasil revisi. Basis CHAPTERS tetap dipertahankan, lalu
 * diperkaya dengan pembuka analogi, latihan bertingkat, kotak error,
 * cheat sheet, kuis 5 soal, dan tabel jejak.
 */
const ENHANCEMENTS: Record<string, Partial<Chapter>> = {
  'bab-3': bab3,
  'bab-4': bab4,
  'bab-5': bab5,
  'bab-6': bab6,
  ...bab7to11,
};

/** Bab lama 7-11 bergeser menjadi 8-12 setelah bab tampilan.py disisipkan. */
const RENUMBER: Record<string, number> = {
  'bab-7': 8,
  'bab-8': 9,
  'bab-9': 10,
  'bab-10': 11,
  'bab-11': 12,
};

function buildChapters(): Chapter[] {
  const merged: Chapter[] = BASE_CHAPTERS.map((chapter) => {
    const patch = ENHANCEMENTS[chapter.id] ?? {};
    const next: Chapter = { ...chapter, ...patch };
    if (RENUMBER[chapter.id]) {
      next.number = RENUMBER[chapter.id];
    }
    return next;
  });

  const mainIndex = merged.findIndex((chapter) => chapter.id === 'bab-6');
  merged.splice(mainIndex + 1, 0, TAMPILAN_CHAPTER);

  // Samakan tautan sebelum/sesudah dengan urutan final.
  return merged.map((chapter, index) => ({
    ...chapter,
    prevChapterId: index > 0 ? merged[index - 1].id : undefined,
    nextChapterId: index < merged.length - 1 ? merged[index + 1].id : undefined,
  }));
}

export const CHAPTERS: Chapter[] = buildChapters();

export const CHAPTER_COUNT = CHAPTERS.length;
