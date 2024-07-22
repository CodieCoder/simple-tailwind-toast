import { ISimpleClassNames, IToastContextStore, TToastPosition } from './types';

export const initialValues: Partial<IToastContextStore> = {
  toasts: [],
};

const BASE_TOAST_CLASSES =
  ['p-[0.4rem]', 'min-w-[19rem]', 'rounded'].join(' ') + ' ';

export const TOAST_CLASSES: ISimpleClassNames = {
  types: {
    default: BASE_TOAST_CLASSES + 'bg-gray-900 text-gray-200',
    error: BASE_TOAST_CLASSES + 'bg-red-600 text-grey-100',
    info: BASE_TOAST_CLASSES + 'bg-indigo-700 text-gray-200',
    success: BASE_TOAST_CLASSES + 'bg-green-700 text-white',
    warning: BASE_TOAST_CLASSES + 'bg-amber-400 text-gray-900',
  },
};

export const ToastPositions: Record<TToastPosition, string> = {
  bottomCenter: 'bottom-2',
  bottomLeft: 'bottom-2 left-6',
  bottomRight: 'bottom-2 right-6',
  midCenter: '',
  midLeft: 'left-6',
  midRight: 'right-6',
  topCenter: 'top-0',
  topLeft: 'top-0 left-6',
  topRight: 'top-0 right-6',
};

const toastPositioning = (position?: TToastPosition): string => {
  const result = 'fixed text-center text-[#fff] z-[9999] mx-auto ';

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
