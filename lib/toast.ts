import type { ReactNode } from 'react';
import type { ToastApi, ToastInput, ToastMethodOptions, ToastType } from './types';
import { toastStore } from './store';

const addTypedToast = (
  type: ToastType,
  title: ReactNode,
  options?: ToastMethodOptions,
): string => toastStore.add(title, options, type);

export const toast = ((input: ToastInput, options?: ToastMethodOptions) =>
  toastStore.add(input, options)) as ToastApi;

toast.success = (title, options) => addTypedToast('success', title, options);
toast.error = (title, options) => addTypedToast('error', title, options);
toast.warning = (title, options) => addTypedToast('warning', title, options);
toast.info = (title, options) => addTypedToast('info', title, options);
toast.dismiss = (id) => toastStore.dismiss(id);
toast.clear = () => toastStore.clear();
