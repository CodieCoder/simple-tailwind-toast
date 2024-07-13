import React from 'react';
import { useSimpleToast } from '../store/hooks';
import Toast from './Toast';
import './styles.css';
import { TOAST_CLASSES } from '../constants';
import { ISimpleToastProps } from '../types';

const SimpleToaster: React.FC<ISimpleToastProps> = (props) => {
  const { store } = useSimpleToast();

  return (
    <div className={TOAST_CLASSES.simpleToast}>
      {store?.toasts?.map((toast) => <Toast key={toast.id} {...props} />)}
    </div>
  );
};

export default SimpleToaster;
