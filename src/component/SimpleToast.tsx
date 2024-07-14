import React from "react";
import { useSimpleToast } from "../store/hooks";
import Toast from "./Toast";
import { DEFAULT_CLASSES } from "../constants";
import { ISimpleClassNames } from "../types";

const SimpleToaster: React.FC<ISimpleClassNames> = (props) => {
  const { store } = useSimpleToast();

  return (
    <div className={DEFAULT_CLASSES.simpleToast}>
      {store?.toasts?.map((toast) => (
        <Toast key={toast.id} toast={toast} classNames={props} />
      ))}
    </div>
  );
};

export default SimpleToaster;
