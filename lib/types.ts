export type TToastPosition =
  | 'bottomCenter'
  | 'bottomLeft'
  | 'bottomRight'
  | 'midCenter'
  | 'midLeft'
  | 'midRight'
  | 'topCenter'
  | 'topLeft'
  | 'topRight';

export interface ISimpleToastContent {
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: 'default' | 'error' | 'info' | 'success' | 'warning';
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
  payload?: Partial<ISimpleToast>;
};

export type IToastContextDispatch = React.Dispatch<TToastReducerPayload>;

export interface ISimpleClassNames {
  title?: string;
  description?: string;
  close?: string;
  types?: {
    default?: string;
    error?: string;
    info?: string;
    success?: string;
    warning?: string;
  };
}

export interface ISimpleToastProps {
  toast: ISimpleToast;
  classNames?: ISimpleClassNames;
}
