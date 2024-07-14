import { ISimpleClassNames, IToastContextStore } from "./types"

export const initialValues: Partial<IToastContextStore> = {
  toasts: [],
}

export const TOAST_CLASSES: ISimpleClassNames = {
  types: {
    error: "text-red-600",
    warning: "text-[rgb(252,140,4)]",
    success: "",
  },
}

export const DEFAULT_CLASSES = {
  simpleToast:
    "fixed top-0 mx-auto text-center text-[#470450] font-semibold z-[9999] p-4",
  toast:
    "transition duration-1000 top-0 bg-[#f6e5f6] border-2 border-[#ee55ee] shadow-[0px_0px_5px_#ee55ee] rounded-md p-1.5 mx-auto mt-4 w-80 min-w-20 max-w-80 animate-[showToast_0.3s_ease-in-out] flex justify-between",

  hideToast:
    "transition duration-1000 top-0 bg-[#f6e5f6] border-2 border-gray-300 shadow-md rounded-md p-1.5 mx-auto mt-4 w-80 min-w-20 max-w-80 flex justify-between animate-showToast",
}
