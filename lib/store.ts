import { isValidElement } from 'react';
import type {
  ToastInput,
  ToastMethodOptions,
  ToastOptions,
  ToastRecord,
  ToastType,
} from './types';

type ToastListener = () => void;

interface ToastStoreConfig {
  maxToasts?: number;
}

interface ToastPatch {
  id?: string;
  title?: ToastOptions['title'];
  description?: ToastOptions['description'];
  type?: ToastType;
  duration?: ToastOptions['duration'];
  dismissible?: boolean;
  className?: string;
  onDismiss?: ToastOptions['onDismiss'];
}

const TOAST_OPTION_KEYS = new Set([
  'id',
  'title',
  'description',
  'type',
  'duration',
  'dismissible',
  'className',
  'onDismiss',
]);

const createId = (): string => {
  const cryptoApi = globalThis.crypto;

  if (cryptoApi?.randomUUID) {
    return cryptoApi.randomUUID();
  }

  return Math.random().toString(36).slice(2, 10);
};

const isToastOptions = (input: ToastInput): input is ToastOptions => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return false;
  }

  if (isValidElement(input)) {
    return false;
  }

  return Object.keys(input).some((key) => TOAST_OPTION_KEYS.has(key));
};

const compact = (toast: ToastPatch): ToastPatch => {
  const result: ToastPatch = {};

  for (const key of Object.keys(toast) as Array<keyof ToastPatch>) {
    if (toast[key] !== undefined) {
      result[key] = toast[key] as never;
    }
  }

  return result;
};

const toPatch = (
  input: ToastInput,
  options?: ToastMethodOptions,
  type?: ToastType,
): ToastPatch => {
  if (isToastOptions(input)) {
    return compact({
      ...input,
      type: type ?? input.type,
    });
  }

  return compact({
    ...options,
    title: input,
    type,
  });
};

export const createToastStore = (config: ToastStoreConfig = {}) => {
  let toasts: ToastRecord[] = [];
  let maxToasts = config.maxToasts;
  const listeners = new Set<ToastListener>();

  const emit = () => {
    listeners.forEach((listener) => listener());
  };

  const notifyDismissed = (dismissed: ToastRecord[]) => {
    dismissed.forEach((toast) => {
      toast.onDismiss?.(toast);
    });
  };

  const limitToasts = (nextToasts: ToastRecord[]): ToastRecord[] => {
    if (!maxToasts || nextToasts.length <= maxToasts) {
      return nextToasts;
    }

    const overflow = nextToasts.length - maxToasts;
    notifyDismissed(nextToasts.slice(0, overflow));

    return nextToasts.slice(overflow);
  };

  const setToasts = (updater: (current: ToastRecord[]) => ToastRecord[]) => {
    const nextToasts = updater(toasts);

    if (nextToasts !== toasts) {
      toasts = nextToasts;
      emit();
    }
  };

  return {
    subscribe(listener: ToastListener) {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot() {
      return toasts;
    },
    getServerSnapshot() {
      return [] as ToastRecord[];
    },
    add(
      input: ToastInput,
      options?: ToastMethodOptions,
      type?: ToastType,
    ): string {
      const patch = toPatch(input, options, type);
      const id = patch.id ?? createId();

      setToasts((current) => {
        const existingIndex = current.findIndex((toast) => toast.id === id);

        if (existingIndex >= 0) {
          const next = [...current];
          next[existingIndex] = {
            ...next[existingIndex],
            ...patch,
            id,
            createdAt: next[existingIndex].createdAt,
          };

          return limitToasts(next);
        }

        return limitToasts([
          ...current,
          {
            id,
            title: patch.title,
            description: patch.description,
            type: patch.type ?? 'default',
            duration: patch.duration,
            dismissible: patch.dismissible ?? true,
            className: patch.className,
            createdAt: Date.now(),
            onDismiss: patch.onDismiss,
          },
        ]);
      });

      return id;
    },
    dismiss(id: string) {
      if (!id) {
        return;
      }

      let dismissed: ToastRecord[] = [];

      setToasts((current) => {
        const next = current.filter((toast) => {
          if (toast.id === id) {
            dismissed = [toast];
            return false;
          }

          return true;
        });

        return next.length === current.length ? current : next;
      });

      notifyDismissed(dismissed);
    },
    clear() {
      const dismissed = toasts;

      setToasts(() => []);
      notifyDismissed(dismissed);
    },
    setMaxToasts(nextMaxToasts?: number) {
      maxToasts = nextMaxToasts;
      setToasts((current) => limitToasts(current));
    },
  };
};

export const toastStore = createToastStore();
