import { FC } from 'react';
import { useSimpleToast } from '../store/hooks';
import Toast from './Toast';
import { DEFAULT_CLASSES } from '../constants';
import { ISimpleClassNames, TToastPosition } from '../types';
import '../style.css';

const SimpleToaster: FC<{
  classNames?: ISimpleClassNames;
  position?: TToastPosition;
}> = (props) => {
  const { store } = useSimpleToast();

  return (
    <div className={DEFAULT_CLASSES.simpleToast(props.position ?? 'topRight')}>
      {store?.toasts?.map((toast) => {
        return (
          <Toast key={toast.id} toast={toast} classNames={props?.classNames} />
        );
      })}
    </div>
  );
};

export default SimpleToaster;
