import type { ToastClassNames } from './types';

export const toastClasses: { default: Required<ToastClassNames> } = {
  default: {
    viewport:
      'pointer-events-none fixed z-[9999] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 p-4',
    toast:
      'pointer-events-auto flex items-start gap-3 rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-950 shadow-lg ring-1 ring-black/5',
    icon: 'mt-0.5 h-4 w-4 shrink-0',
    content: 'min-w-0 flex-1',
    title: 'font-medium leading-5',
    description: 'mt-1 text-sm leading-5 text-slate-600',
    closeButton:
      'ml-auto shrink-0 rounded-sm text-slate-500 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
    closeIcon: 'h-4 w-4',
    positions: {
      'top-left': 'left-4 top-4',
      'top-center': 'left-1/2 top-4 -translate-x-1/2',
      'top-right': 'right-4 top-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4',
    },
    variants: {
      default: '',
      success: 'border-emerald-200 text-emerald-950',
      error: 'border-red-200 text-red-950',
      warning: 'border-amber-200 text-amber-950',
      info: 'border-sky-200 text-sky-950',
    },
  },
};
