export type ChapterId = 
  | 'bab-1'
  | 'bab-2'
  | 'bab-3'
  | 'bab-4'
  | 'bab-5'
  | 'bab-6'
  | 'bab-7'
  | 'bab-8'
  | 'bab-9'
  | 'bab-10'
  | 'bab-11';

export interface LineExplanation {
  line: number;
  code: string;
  explanation: string;
}

export interface CodeSnippet {
  id: string;
  title: string;
  filename?: string;
  code: string;
  explanation: string;
  output?: string;
  lineExplanations?: LineExplanation[];
  highlightLines?: number[];
  isSimulated?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PredictExercise {
  id: string;
  title: string;
  prompt: string;
  code: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

export interface FillInBlankExercise {
  id: string;
  title: string;
  prompt: string;
  templateCode: string; // e.g. "nama = 'Budi'\n_____ (nama)"
  missingToken: string; // e.g. "print"
  explanation: string;
  hint1: string;
  hint2?: string;
}

export interface SequenceExerciseItem {
  id: string;
  text: string;
  order: number;
}

export interface SequenceExercise {
  id: string;
  title: string;
  prompt: string;
  items: SequenceExerciseItem[];
  explanation: string;
}

export interface ChapterSection {
  id: string;
  title: string;
  content: string;
  analogy?: string; // Perumpamaan sehari-hari
  codeSnippets?: CodeSnippet[];
  importantNotes?: string[];
  commonMistakes?: string[];
}

export interface Chapter {
  id: ChapterId;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  learningGoals: string[];
  sections: ChapterSection[];
  predictExercises?: PredictExercise[];
  fillInBlankExercises?: FillInBlankExercise[];
  sequenceExercise?: SequenceExercise;
  quiz?: QuizQuestion[];
  summaryPoints: string[];
  nextChapterId?: ChapterId;
  prevChapterId?: ChapterId;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Dasar' | 'Tipe Data' | 'Struktur Kontrol' | 'Fungsi & Modularitas' | 'Alat & Konsep';
  simpleDefinition: string;
  analogy?: string;
  codeExample?: string;
  relatedChapterId: ChapterId;
  relatedChapterTitle: string;
}

export interface PythonErrorGuide {
  id: string;
  errorName: string;
  title: string;
  simpleMeaning: string;
  sampleBrokenCode: string;
  terminalOutput: string;
  commonCauses: string[];
  howToFix: string;
  sampleFixedCode: string;
  practiceSnippet: {
    question: string;
    buggyCode: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface ProgramState {
  anggaran: number;
  jumlahHari: number;
  jatahHarian: number;
  hariAktif: number;
  daftarTransaksi: Array<{
    id: number;
    hari: number;
    kategori: string;
    jumlah: number;
    catatan: string;
  }>;
}

export interface UserProgress {
  completedChapters: ChapterId[];
  lastVisitedChapter: ChapterId;
  quizScores: Record<ChapterId, number>;
  completedExercises: string[];
  checklistItems: string[];
  updatedAt: string;
}
