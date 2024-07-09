/// <reference types="react" />
export * from './typings';
declare const simpleToaster: {
    SimpleToaster: () => import("react").JSX.Element;
    SimpleToastProvider: import("react").FC<{
        children: import("react").ReactNode;
    }>;
    useSimpleToast: () => {
        store: Partial<import("./typings").IToastContextStore>;
        toast: {
            add: (toast: Partial<import("./typings").ISimpleToast>) => void;
            remove: (id?: string | undefined) => void;
        };
    };
};
export default simpleToaster;
