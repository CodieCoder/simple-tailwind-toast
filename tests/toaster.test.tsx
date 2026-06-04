/** @vitest-environment jsdom */
import '@testing-library/jest-dom';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Toaster, toast } from '../lib';

describe('Toaster', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    toast.clear();
  });

  afterEach(() => {
    act(() => {
      toast.clear();
    });
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders at the requested position with live-region attributes', () => {
    render(<Toaster position="bottom-left" />);

    const viewport = screen.getByRole('list');
    expect(viewport).toHaveAttribute('aria-live', 'polite');
    expect(viewport).toHaveAttribute('aria-relevant', 'additions removals');
    expect(viewport).toHaveAttribute('data-position', 'bottom-left');
    expect(viewport).toHaveClass('bottom-4');
    expect(viewport).toHaveClass('left-4');
  });

  it('renders multiple toasts and limits visible toasts with maxToasts', () => {
    render(<Toaster maxToasts={2} />);

    act(() => {
      toast('One', { duration: false });
      toast('Two', { duration: false });
      toast('Three', { duration: false });
    });

    expect(screen.queryByText('One')).not.toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
    expect(screen.getByText('Three')).toBeInTheDocument();
    expect(screen.getAllByRole('status')).toHaveLength(2);
  });

  it('accepts React nodes as toast titles', () => {
    render(<Toaster />);

    act(() => {
      toast(<span>Rich title</span>, { duration: false });
    });

    expect(screen.getByText('Rich title')).toBeInTheDocument();
  });

  it('uses alert roles for warning and error toasts', () => {
    render(<Toaster />);

    act(() => {
      toast.error('Broken', { duration: false });
      toast.warning('Careful', { duration: false });
      toast.success('Saved', { duration: false });
    });

    expect(screen.getAllByRole('alert')).toHaveLength(2);
    expect(screen.getByText('Saved').closest('[role="status"]')).toBeTruthy();
  });

  it('applies class slot replacements, variant classes, and data attributes', () => {
    render(
      <Toaster
        classNames={{
          viewport: 'custom-viewport',
          toast: 'custom-toast',
          title: 'custom-title',
          positions: { 'top-right': 'custom-position' },
          variants: { success: 'custom-success' },
        }}
      />,
    );

    act(() => {
      toast.success('Styled', { duration: false, className: 'per-toast' });
    });

    const viewport = screen.getByRole('list');
    const toastElement = screen.getByRole('status');
    expect(viewport).toHaveClass('custom-viewport');
    expect(viewport).toHaveClass('custom-position');
    expect(toastElement).toHaveClass('custom-toast');
    expect(toastElement).toHaveClass('custom-success');
    expect(toastElement).toHaveClass('per-toast');
    expect(toastElement).toHaveAttribute('data-type', 'success');
    expect(toastElement).toHaveAttribute('data-state', 'open');
    expect(screen.getByText('Styled')).toHaveClass('custom-title');
  });

  it('renders icons and a custom render function', () => {
    render(
      <Toaster
        icons={{ info: <span data-testid="info-icon">i</span> }}
        renderToast={(toastRecord, helpers) => (
          <button onClick={helpers.dismiss} type="button">
            Custom {toastRecord.title}
          </button>
        )}
      />,
    );

    act(() => {
      toast.info('Rendered', { duration: false });
    });

    expect(screen.queryByTestId('info-icon')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Custom Rendered'));
    expect(screen.queryByText('Custom Rendered')).not.toBeInTheDocument();
  });

  it('renders icons when the default renderer is used', () => {
    render(<Toaster icons={{ success: <span data-testid="success-icon">S</span> }} />);

    act(() => {
      toast.success('Saved', { duration: false });
    });

    expect(screen.getByTestId('success-icon')).toBeInTheDocument();
  });

  it('dismisses a toast from the close button', () => {
    const onDismiss = vi.fn();
    render(<Toaster />);

    act(() => {
      toast('Close me', { duration: false, onDismiss });
    });

    fireEvent.click(screen.getByLabelText('Dismiss notification'));

    expect(screen.queryByText('Close me')).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('auto-dismisses toasts after their duration and keeps persistent toasts', () => {
    render(<Toaster />);

    act(() => {
      toast('Short lived', { duration: 1000 });
      toast('Persistent', { duration: false });
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('Short lived')).not.toBeInTheDocument();
    expect(screen.getByText('Persistent')).toBeInTheDocument();
  });

  it('clears timers on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    const { unmount } = render(<Toaster />);

    act(() => {
      toast('Timer', { duration: 1000 });
    });

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
