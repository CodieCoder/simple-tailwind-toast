/// <reference types="react" />
import { ISimpleToast, IToastContextStore } from '..';
export declare const initialValues: Partial<IToastContextStore>;
export declare const toastContextStore: import("react").Context<Partial<IToastContextStore>>;
export declare const toastContextDispatch: import("react").Context<import("react").Dispatch<import("..").TToastReducer>>;
export declare const useSimpleToast: () => {
    store: Partial<IToastContextStore>;
    toast: {
        add: (toast: Partial<ISimpleToast>) => void;
        remove: (id?: string | undefined) => void;
    };
};
