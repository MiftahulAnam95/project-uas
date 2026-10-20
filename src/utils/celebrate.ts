import confetti from 'canvas-confetti';

/** Warna confetti mengikuti palet brand agar tetap senada dengan UI. */
const PALETTE = ['#6a5ae8', '#a855f7', '#22d3ee', '#10b981', '#f59e0b', '#f43f5e'];

function safe() {
  if (typeof window === 'undefined') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Letusan kecil dari tengah bawah layar — untuk jawaban benar. */
export function celebrateSmall() {
  if (!safe()) return;
  confetti({
    particleCount: 70,
    spread: 65,
    startVelocity: 38,
    scalar: 0.85,
    origin: { y: 0.72 },
    colors: PALETTE,
    disableForReducedMotion: true,
  });
}

/** Pesta penuh — untuk momen besar (kuis lulus / checklist tuntas). */
export function celebrateBig() {
  if (!safe()) return;
  confetti({
    particleCount: 110,
    spread: 78,
    startVelocity: 45,
    origin: { y: 0.6 },
    colors: PALETTE,
    disableForReducedMotion: true,
  });
  window.setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors: PALETTE,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors: PALETTE,
      disableForReducedMotion: true,
    });
  }, 180);
}
