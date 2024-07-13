export interface ISimpleToastContent {
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: 'error' | 'success' | 'warning';
}

export interface ISimpleToast {
  id: string;
  content: ISimpleToastContent;
  duration: number;
}

export interface IToastContextStore {
  toasts: ISimpleToast[];
}

export type TToastReducerPayload = {
  type: string;
  payload?: any;
};

export type IToastContextDispatch = React.Dispatch<TToastReducerPayload>;

export interface ISimpleToasterProps {
  className?: string;
}

export interface ISimpleToastProps extends ISimpleToasterProps {
  toast: ISimpleToast;
  classNames: {
    title?: string;
    description?: string;
    close?: string;
    types?: {
      error?: string;
      warning?: string;
      success?: string;
    };
  };
}
