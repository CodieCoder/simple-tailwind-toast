import { ISimpleToast, IToastContextStore, TToastReducer } from '../types';
import { SIMPLE_TOASTER_ACTIONS } from './actions';
import { v4 } from 'uuid';

export const toastReducer = (
  state: IToastContextStore,
  { type, payload }: TToastReducer
): Partial<IToastContextStore> => {
  let toast: ISimpleToast = {
    id: v4(),
    content: {},
    duration: 5,
  };

  let tmp: any;

  switch (type) {
    case SIMPLE_TOASTER_ACTIONS.ADD:
      toast = { ...toast, ...payload };
      return { ...state, toasts: [...(state.toasts ?? []), toast] };

    case SIMPLE_TOASTER_ACTIONS.REMOVE:
      if (state.toasts?.length) {
        tmp = state.toasts?.filter((toast) => toast.id !== payload);
        return { ...state, toasts: tmp };
      } else {
        return state;
      }

    case SIMPLE_TOASTER_ACTIONS.REMOVE_ALL:
      return { toasts: [] };

    default:
      return state;
  }
};
