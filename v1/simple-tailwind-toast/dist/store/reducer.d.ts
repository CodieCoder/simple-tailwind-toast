import { IToastContextStore, TToastReducer } from '..';
export declare const toastReducer: (state: IToastContextStore, { type, payload }: TToastReducer) => Partial<IToastContextStore>;
