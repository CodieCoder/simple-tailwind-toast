import { ISimpleClassNames, IToastContextStore, TToastPosition } from './types';

export const initialValues: Partial<IToastContextStore> = {
  toasts: [],
};

export const TOAST_CLASSES: ISimpleClassNames = {
  types: {
    error: 'text-red-600',
    warning: 'text-[rgb(252,140,4)]',
    success: '',
  },
};

export const ToastPositions: Record<TToastPosition, string> = {
  bottomCenter: 'bottom-0',
  bottomLeft: 'bottom-0 left-6',
  bottomRight: 'bottom-0 right-6',
  midCenter: '',
  midLeft: 'left-6',
  midRight: 'right-6',
  topCenter: 'top-0',
  topLeft: 'top-0 left-6',
  topRight: 'top-0 right-6',
};

const toastPositioning = (position?: TToastPosition): string => {
  const result = 'fixed text-center text-[#fff] z-[9999] p-1 mx-auto ';

  if (!position) return result;

  return result + ToastPositions[position];
};

export const DEFAULT_CLASSES = {
  simpleToast: (position?: TToastPosition): string =>
    toastPositioning(position),
  toast: 'simpleToast',

  hideToast: 'hideToast',
};

export const DEFAULT_DELAY_TIME = {
  hideToast: 350,
  durationMultiplier: 1000,
};
