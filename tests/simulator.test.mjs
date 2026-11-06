import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { createServer } from 'vite';
import React, { act } from 'react';

let vite, dom, createRoot, TerminalSimulator, parseSimulatorInteger;
before(async () => {
  dom = new JSDOM('<!doctype html><div id="root"></div>', { url: 'http://localhost/' });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  ({ createRoot } = await import('react-dom/client'));
  vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true } });
  ({ TerminalSimulator } = await vite.ssrLoadModule('/src/components/learning/TerminalSimulator.tsx'));
  ({ parseSimulatorInteger } = await vite.ssrLoadModule('/src/utils/simulatorInput.ts'));
});
after(async () => { await vite?.close(); dom?.window.close(); });

test('validasi angka dan kategori sesuai pola int Python', () => {
  assert.equal(parseSimulatorInteger(' 1.500.000 ', true), 1500000);
  assert.equal(parseSimulatorInteger('1,500', true), 1500);
  assert.equal(parseSimulatorInteger('+1_000', true), 1000);
  assert.equal(parseSimulatorInteger('-2', true), -2);
  for (const value of ['', '1e3', '1.5', '1,5', '0x10', '1__0', 'abc', '9007199254740992']) {
    assert.equal(parseSimulatorInteger(value), null, value);
  }
  assert.equal(parseSimulatorInteger('1e3', true), null);
  assert.equal(parseSimulatorInteger(' 2 '), 2);
});

test('simulator dapat menyelesaikan setup, transaksi, laporan, dan keluar', async () => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  await act(async () => root.render(React.createElement(TerminalSimulator)));
  const submit = async (value) => {
    const input = container.querySelector('input');
    assert.equal(input.disabled, false, `Input harus aktif saat mengirim ${value}`);
    await act(async () => {
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(input, value);
      input.dispatchEvent(new window.Event('input', { bubbles: true }));
      input.dispatchEvent(new window.Event('change', { bubbles: true }));
    });
    await act(async () => container.querySelector('form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })));
  };
  await submit('1e3');
  assert.match(container.textContent, /Input salah/);
  await submit('3.000.000');
  await submit('30');
  await submit('');
  assert.match(container.textContent, /Catat pengeluaran/);
  await submit('1');
  await submit('1.5');
  assert.match(container.textContent, /Pilihan tidak valid/);
  await submit('1');
  await submit('85.000');
  assert.match(container.textContent, /HATI-HATI/);
  await submit('');
  await submit('1');
  await submit('2');
  await submit('40000');
  assert.match(container.textContent, /BOROS/);
  await submit('');
  await submit('4');
  assert.match(container.textContent, /RIWAYAT TRANSAKSI/);
  await submit('');
  await submit('5');
  assert.match(container.textContent, /LAPORAN PENGELUARAN PER KATEGORI/);
  await submit('');
  await submit('2');
  await submit('Honor');
  await submit('10000');
  assert.match(container.textContent, /Saldo sekarang: Rp2\.885\.000/);
  await submit('');
  await submit('6');
  assert.match(container.textContent, /Masuk ke hari ke-2/);
  await submit('');
  await submit('0');
  assert.match(container.textContent, /SAMPAI JUMPA/);
  assert.equal(container.querySelector('input').disabled, true);
  await act(async () => root.unmount());
});
