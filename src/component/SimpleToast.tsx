import React from 'react';
import { useSimpleToast } from '../store/hooks';
import Toast from './Toast';
import '../style.css';

const SimpleToaster = () => {
  const { store } = useSimpleToast();

  return (
    <div className="simple-toaster">
      {store?.toasts?.map((toast) => (
        <Toast toast={toast} key={toast.id} />
      ))}
    </div>
  );
};

export default SimpleToaster;
