import { useState, useEffect, useCallback } from 'react';
import { ChapterId, UserProgress } from '../types';

const STORAGE_KEY = 'python_dari_nol_user_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  completedChapters: [],
  lastVisitedChapter: 'bab-1',
  quizScores: {
    'bab-1': 0,
    'bab-2': 0,
    'bab-3': 0,
    'bab-4': 0,
    'bab-5': 0,
    'bab-6': 0,
    'bab-7': 0,
    'bab-8': 0,
    'bab-9': 0,
    'bab-10': 0,
    'bab-11': 0,
  },
  completedExercises: [],
  checklistItems: [],
  updatedAt: new Date().toISOString(),
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(stored) };
      }
    } catch {
      // LocalStorage not available or parse error
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage write errors
    }
  }, [progress]);

  const markChapterComplete = useCallback((chapterId: ChapterId) => {
    setProgress((prev) => {
      if (prev.completedChapters.includes(chapterId)) return prev;
      return {
        ...prev,
        completedChapters: [...prev.completedChapters, chapterId],
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const toggleChapterComplete = useCallback((chapterId: ChapterId) => {
    setProgress((prev) => {
      const isCompleted = prev.completedChapters.includes(chapterId);
      const updated = isCompleted
        ? prev.completedChapters.filter((id) => id !== chapterId)
        : [...prev.completedChapters, chapterId];
      return {
        ...prev,
        completedChapters: updated,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const setLastVisited = useCallback((chapterId: ChapterId) => {
    setProgress((prev) => ({
      ...prev,
      lastVisitedChapter: chapterId,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const saveQuizScore = useCallback((chapterId: ChapterId, score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [chapterId]: Math.max(prev.quizScores[chapterId] || 0, score),
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const markExerciseCompleted = useCallback((exerciseId: string) => {
    setProgress((prev) => {
      if (prev.completedExercises.includes(exerciseId)) return prev;
      return {
        ...prev,
        completedExercises: [...prev.completedExercises, exerciseId],
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const toggleChecklistItem = useCallback((itemId: string) => {
    setProgress((prev) => {
      const exists = prev.checklistItems.includes(itemId);
      const updated = exists
        ? prev.checklistItems.filter((id) => id !== itemId)
        : [...prev.checklistItems, itemId];
      return {
        ...prev,
        checklistItems: updated,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const resetAllProgress = useCallback(() => {
    setProgress({
      ...DEFAULT_PROGRESS,
      updatedAt: new Date().toISOString(),
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const totalChapters = 11;
  const completedCount = progress.completedChapters.length;
  const percentage = Math.round((completedCount / totalChapters) * 100);

  return {
    progress,
    markChapterComplete,
    toggleChapterComplete,
    setLastVisited,
    saveQuizScore,
    markExerciseCompleted,
    toggleChecklistItem,
    resetAllProgress,
    totalChapters,
    completedCount,
    percentage,
  };
}
