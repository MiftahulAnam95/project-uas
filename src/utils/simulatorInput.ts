/**
 * Aproksimasi int() Python untuk simulator berbasis Number JavaScript.
 * Pembatasan safe integer mencegah angka besar diam-diam kehilangan presisi.
 * baca_angka() menghapus titik dan koma; baca_pilihan() tidak.
 */
export function parseSimulatorInteger(input: string, removeSeparators = false): number | null {
  const text = (removeSeparators ? input.replace(/[.,]/g, '') : input).trim();
  // int() menerima tanda dan garis bawah di antara digit, bukan desimal atau notasi ilmiah.
  if (!/^[+-]?[0-9]+(?:_[0-9]+)*$/.test(text)) return null;
  const value = Number(text.replace(/_/g, ''));
  return Number.isSafeInteger(value) ? value : null;
}
