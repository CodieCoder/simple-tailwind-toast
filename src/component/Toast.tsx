import React, { useCallback } from 'react';
import { ISimpleToast } from '../types';
import { useSimpleToast } from '../store/hooks';
import './styles.css';

const Toast: React.FC<{ toast: ISimpleToast }> = ({ toast }) => {
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

  return (
    <div
      key={toast.id}
      className={`simple-toast type-${toast.content.type} ${className}`}
    >
      <div className="left">
        <div className="toast-title">{toast.content.title}</div>
        <div className="toast-description">{toast.content.description}</div>
      </div>
      <div className="right">
        <span onClick={removeToast}>x</span>
      </div>
    </div>
  );
};

export default Toast;
