import { createContext } from 'react';
import { IToastContextDispatch, IToastContextStore } from '../types';
import { initialValues } from '../constants';

export const toastContextStore =
  createContext<Partial<IToastContextStore>>(initialValues);

export const toastContextDispatch = createContext<IToastContextDispatch>(
  () => initialValues
);
export { initialValues };
