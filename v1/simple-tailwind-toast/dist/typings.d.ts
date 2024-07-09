/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
/// <reference types="react" />
export interface ISimpleToastContent {
    title?: React.ReactNode;
    description?: React.ReactNode;
    type?: 'error' | 'success' | 'warning';
}
export interface ISimpleToast {
    id?: string;
    content: ISimpleToastContent;
    duration?: number;
}
export interface IToastContextStore {
    toasts: ISimpleToast[];
}
export declare type TToastReducer = {
    type: string;
    payload?: any;
};
export declare type IToastContextDispatch = React.Dispatch<TToastReducer>;
export declare type SimpleToaster = React.JSX.Element;
export declare type SimpleToastProvider = React.FC<{
    children: React.ReactNode;
}>;
