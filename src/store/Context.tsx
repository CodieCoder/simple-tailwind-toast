import { createContext, useContext } from 'react';
import {
  ISimpleToast,
  IToastContextDispatch,
  IToastContextStore,
} from '../types';
import { SIMPLE_TOASTER_ACTIONS } from './actions';

export const initialValues: Partial<IToastContextStore> = {
  toasts: [],
};

export const toastContextStore =
  createContext<Partial<IToastContextStore>>(initialValues);

export const toastContextDispatch = createContext<IToastContextDispatch>(
  () => initialValues
);

export const useSimpleToast = () => {
  const dispatch = useContext(toastContextDispatch);

  const toast = {
    add: (toast: Partial<ISimpleToast>) => {
      dispatch({
        type: SIMPLE_TOASTER_ACTIONS.ADD,
        payload: toast,
      });
    },
    remove: (id: string) => {
      if (!id) return;
      dispatch({
        type: SIMPLE_TOASTER_ACTIONS.REMOVE,
        payload: id,
      });
    },
    removeAll: () =>{
        dispatch({type: SIMPLE_TOASTER_ACTIONS.REMOVE_ALL})
    }
  };

  return { store: useContext(toastContextStore), toast };
};
