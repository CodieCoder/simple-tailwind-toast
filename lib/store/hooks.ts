import { useContext } from 'react';
import { ISimpleToast } from '../types';
import { SIMPLE_TOASTER_ACTIONS } from './actions';
import { toastContextDispatch, toastContextStore } from './Context';

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
        payload: { id },
      });
    },
    removeAll: () => {
      dispatch({ type: SIMPLE_TOASTER_ACTIONS.REMOVE_ALL });
    },
  };

  return { store: useContext(toastContextStore), toast };
};
