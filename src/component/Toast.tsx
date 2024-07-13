import React, { useCallback } from 'react';
import { ISimpleToastProps } from '../types';
import { useSimpleToast } from '../store/hooks';
import './styles.css';
import { TOAST_CLASSES } from '../constants';

const Toast: React.FC<ISimpleToastProps> = ({ toast, classNames }) => {
  const [className, setClassName] = React.useState('');
  const { toast: dispatch } = useSimpleToast();

  const removeToast = useCallback(() => {
    setClassName('hideToast');
    setTimeout(() => {
      dispatch.remove(toast.id);
    }, 200);
  }, [setClassName, dispatch, toast.id]);

  React.useEffect(() => {
    setTimeout(() => {
      removeToast();
    }, toast.duration * 1000);
  }, [removeToast, toast.duration]);

  // const cls =

  return (
    <div
      key={toast.id}
      className={`${TOAST_CLASSES.toast} type-${toast.content.type} ${className}`}
    >
      <div className="w-[95%]">
        <div className="text-center">{toast.content.title}</div>
        <div className="mt-[0.3rem]">{toast.content.description}</div>
      </div>
      <div>
        <span className="cursor-pointer" onClick={removeToast}>
          x
        </span>
      </div>
    </div>
  );
};

export default Toast;
