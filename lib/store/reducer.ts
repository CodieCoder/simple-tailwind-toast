import {
  ISimpleToast,
  IToastContextStore,
  TToastReducerPayload,
} from '../types';
import { SIMPLE_TOASTER_ACTIONS } from './actions';
import { v4 } from 'uuid';

export const toastReducer = (
  state: Partial<IToastContextStore>,
  { type, payload }: TToastReducerPayload
): Partial<IToastContextStore> => {
  let toast: ISimpleToast = {
    id: v4(),
    content: {},
    duration: 5,
  };

  switch (type) {
    case SIMPLE_TOASTER_ACTIONS.ADD:
      toast = { ...toast, ...payload };
      return { ...state, toasts: [...(state.toasts ?? []), toast] };

    case SIMPLE_TOASTER_ACTIONS.REMOVE:
      if (state.toasts?.length) {
        return {
          ...state,
          toasts: state.toasts?.filter((toast) => toast.id !== payload?.id),
        };
      } else {
        return state;
      }

    case SIMPLE_TOASTER_ACTIONS.REMOVE_ALL:
      return { toasts: [] };

    default:
      return state;
  }
};
