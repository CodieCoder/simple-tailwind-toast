/** @vitest-environment node */
import { describe, expect, it } from 'vitest';

describe('SSR safety', () => {
  it('imports without touching browser globals', async () => {
    expect(globalThis.window).toBeUndefined();
    expect(globalThis.document).toBeUndefined();

    const library = await import('../lib');

    expect(library.toast).toBeDefined();
    expect(library.Toaster).toBeDefined();
    expect(globalThis.window).toBeUndefined();
    expect(globalThis.document).toBeUndefined();
  });
});
