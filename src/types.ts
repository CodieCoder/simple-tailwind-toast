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

export type TToastReducer = {
  type: string;
  payload?: any;
};

export type IToastContextDispatch = React.Dispatch<TToastReducer>;
