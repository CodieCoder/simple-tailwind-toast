import React, { Reducer, useReducer } from "react";
import {
  toastContextStore as ToastStore,
  toastContextDispatch as ToastDispatch,
  initialValues,
} from "./Context";
import { toastReducer } from "./reducer";
import { IToastContextStore, TToastReducerPayload } from "../types";

interface IProps {
  children: React.ReactNode;
}

const SimpleToastProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer<
    Reducer<Partial<IToastContextStore>, TToastReducerPayload>
  >(toastReducer, initialValues);

  return (
    <ToastStore.Provider value={state}>
      <ToastDispatch.Provider value={dispatch}>
        {children}
      </ToastDispatch.Provider>
    </ToastStore.Provider>
  );
};

export default SimpleToastProvider;
