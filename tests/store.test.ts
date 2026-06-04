import { describe, expect, it, vi } from 'vitest';
import { createToastStore } from '../lib/store';

describe('toast store', () => {
  it('adds a toast and notifies subscribers', () => {
    const store = createToastStore();
    const listener = vi.fn();
    store.subscribe(listener);

    const id = store.add('Saved');

    expect(id).toBeTruthy();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(store.getSnapshot()).toMatchObject([
      { id, title: 'Saved', type: 'default', dismissible: true },
    ]);
  });

  it('updates a toast when an existing id is reused', () => {
    const store = createToastStore();

    const id = store.add({
      id: 'upload',
      title: 'Uploading',
      description: '0%',
      type: 'info',
    });
    const nextId = store.add({
      id: 'upload',
      title: 'Complete',
      description: '100%',
    });

    expect(nextId).toBe(id);
    expect(store.getSnapshot()).toHaveLength(1);
    expect(store.getSnapshot()[0]).toMatchObject({
      id: 'upload',
      title: 'Complete',
      description: '100%',
      type: 'info',
    });
  });

  it('dismisses one toast and calls onDismiss once', () => {
    const store = createToastStore();
    const onDismiss = vi.fn();
    const firstId = store.add({ title: 'First', onDismiss });
    const secondId = store.add('Second');

    store.dismiss(firstId);

    expect(store.getSnapshot()).toMatchObject([{ id: secondId }]);
    expect(onDismiss).toHaveBeenCalledOnce();
    expect(onDismiss).toHaveBeenCalledWith(
      expect.objectContaining({ id: firstId, title: 'First' }),
    );
  });

  it('clears all toasts and calls each onDismiss handler', () => {
    const store = createToastStore();
    const firstDismiss = vi.fn();
    const secondDismiss = vi.fn();
    store.add({ title: 'First', onDismiss: firstDismiss });
    store.add({ title: 'Second', onDismiss: secondDismiss });

    store.clear();

    expect(store.getSnapshot()).toEqual([]);
    expect(firstDismiss).toHaveBeenCalledOnce();
    expect(secondDismiss).toHaveBeenCalledOnce();
  });

  it('limits stored toasts when configured with maxToasts', () => {
    const store = createToastStore({ maxToasts: 2 });
    const onDismiss = vi.fn();

    store.add({ title: 'One', onDismiss });
    store.add('Two');
    store.add('Three');

    expect(store.getSnapshot().map((toast) => toast.title)).toEqual([
      'Two',
      'Three',
    ]);
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('stores persistent toasts with duration false', () => {
    const store = createToastStore();

    store.add({ title: 'Stay visible', duration: false });

    expect(store.getSnapshot()[0].duration).toBe(false);
  });
});
