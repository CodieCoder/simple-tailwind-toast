import React, { useCallback } from 'react';
import { ISimpleToastProps } from '../types';
import { useSimpleToast } from '../store/hooks';
import { DEFAULT_DELAY_TIME, TOAST_CLASSES } from '../constants';
import CloseButton from './CloseBtn';
import '../style.css';

const Toast: React.FC<ISimpleToastProps> = ({ toast, classNames }) => {
  const [hideToast, setHideToast] = React.useState('');
  const { toast: dispatch } = useSimpleToast();

  const removeToast = useCallback(() => {
    setHideToast('hideToast');
    setTimeout(() => {
      dispatch.remove(toast.id);
    }, DEFAULT_DELAY_TIME.hideToast);
  }, [setHideToast, dispatch, toast.id]);

  React.useEffect(() => {
    setTimeout(() => {
      removeToast();
    }, toast.duration * DEFAULT_DELAY_TIME.durationMultiplier);
  }, [removeToast, toast.duration]);

  const typeClass =
    classNames?.types?.[toast.content.type ?? 'default'] ??
    TOAST_CLASSES.types![toast.content.type!];

  return (
    <div
      key={toast.id}
      className={`simpleToast ${typeClass ?? ''} ${hideToast ?? ''}`}
    >
      <div className="w-[95%] text-white">
        <div className={`text-center ${classNames?.title ?? ''}`}>
          {toast.content.title}
        </div>
        <div className={`mt-[0.3rem] ${classNames?.description ?? ''}`}>
          {toast.content.description}
        </div>
      </div>
      <div className={` ${classNames?.close ?? ''}`}>
        <span className="cursor-pointer" onClick={removeToast}>
          <CloseButton size={15} />
        </span>
      </div>
    </div>
  );
};

export default Toast;
