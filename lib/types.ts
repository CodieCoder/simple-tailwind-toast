import type { ReactNode } from 'react';

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastDuration = number | false;

export interface ToastOptions {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  type?: ToastType;
  duration?: ToastDuration;
  dismissible?: boolean;
  className?: string;
  onDismiss?: (toast: ToastRecord) => void;
}

export interface ToastRecord {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  type: ToastType;
  duration?: ToastDuration;
  dismissible: boolean;
  className?: string;
  createdAt: number;
  onDismiss?: (toast: ToastRecord) => void;
}

export type ToastInput = ReactNode | ToastOptions;

export type ToastMethodOptions = Omit<ToastOptions, 'title' | 'type'>;

export type ToastSlot =
  | 'viewport'
  | 'toast'
  | 'icon'
  | 'content'
  | 'title'
  | 'description'
  | 'closeButton'
  | 'closeIcon';

export type ToastClassNames = Partial<Record<ToastSlot, string>> & {
  positions?: Partial<Record<ToastPosition, string>>;
  variants?: Partial<Record<ToastType, string>>;
};

export type ToastIcons = Partial<Record<ToastType, ReactNode>>;

export interface RenderToastHelpers {
  dismiss: () => void;
}

export interface ToasterProps {
  position?: ToastPosition;
  duration?: ToastDuration;
  maxToasts?: number;
  classNames?: ToastClassNames;
  icons?: ToastIcons;
  renderToast?: (
    toast: ToastRecord,
    helpers: RenderToastHelpers,
  ) => ReactNode;
}

export interface ToastApi {
  (input: ToastInput, options?: ToastMethodOptions): string;
  success: (title: ReactNode, options?: ToastMethodOptions) => string;
  error: (title: ReactNode, options?: ToastMethodOptions) => string;
  warning: (title: ReactNode, options?: ToastMethodOptions) => string;
  info: (title: ReactNode, options?: ToastMethodOptions) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}
