import { useEffect, useMemo, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { toastClasses } from './classes';
import { toastStore } from './store';
import type {
  ToasterProps,
  ToastClassNames,
  ToastDuration,
  ToastPosition,
  ToastRecord,
  ToastSlot,
} from './types';
import { cx } from './utils';

const DEFAULT_DURATION = 4000;
const DEFAULT_POSITION: ToastPosition = 'top-right';

const getSlotClass = (
  classNames: ToastClassNames | undefined,
  slot: ToastSlot,
) => classNames?.[slot] ?? toastClasses.default[slot];

const getPositionClass = (
  classNames: ToastClassNames | undefined,
  position: ToastPosition,
) =>
  classNames?.positions?.[position] ??
  toastClasses.default.positions[position];

const getVariantClass = (
  classNames: ToastClassNames | undefined,
  type: ToastRecord['type'],
) => classNames?.variants?.[type] ?? toastClasses.default.variants[type];

const CloseIcon = ({ className }: { className: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const resolveDuration = (
  toast: ToastRecord,
  defaultDuration: ToastDuration,
) => toast.duration ?? defaultDuration;

const hasContent = (content: ReactNode): boolean =>
  content !== null && content !== undefined && content !== false;

const ToastItem = ({
  toast,
  position,
  defaultDuration,
  classNames,
  icon,
  renderToast,
}: {
  toast: ToastRecord;
  position: ToastPosition;
  defaultDuration: ToastDuration;
  classNames?: ToastClassNames;
  icon?: ReactNode;
  renderToast?: ToasterProps['renderToast'];
}) => {
  const duration = resolveDuration(toast, defaultDuration);
  const dismiss = () => toastStore.dismiss(toast.id);
  const role =
    toast.type === 'error' || toast.type === 'warning' ? 'alert' : 'status';

  useEffect(() => {
    if (duration === false) {
      return undefined;
    }

    const timeout = window.setTimeout(() => toastStore.dismiss(toast.id), duration);

    return () => window.clearTimeout(timeout);
  }, [duration, toast.id]);

  return (
    <li
      className={cx(
        getSlotClass(classNames, 'toast'),
        getVariantClass(classNames, toast.type),
        toast.className,
      )}
      data-position={position}
      data-state="open"
      data-type={toast.type}
      role={role}
    >
      {renderToast ? (
        renderToast(toast, { dismiss })
      ) : (
        <>
          {icon ? (
            <div className={getSlotClass(classNames, 'icon')}>{icon}</div>
          ) : null}
          <div className={getSlotClass(classNames, 'content')}>
            {hasContent(toast.title) ? (
              <div className={getSlotClass(classNames, 'title')}>
                {toast.title}
              </div>
            ) : null}
            {hasContent(toast.description) ? (
              <div className={getSlotClass(classNames, 'description')}>
                {toast.description}
              </div>
            ) : null}
          </div>
          {toast.dismissible ? (
            <button
              aria-label="Dismiss notification"
              className={getSlotClass(classNames, 'closeButton')}
              onClick={dismiss}
              type="button"
            >
              <CloseIcon className={getSlotClass(classNames, 'closeIcon')} />
            </button>
          ) : null}
        </>
      )}
    </li>
  );
};

export const Toaster = ({
  position = DEFAULT_POSITION,
  duration = DEFAULT_DURATION,
  maxToasts,
  classNames,
  icons,
  renderToast,
}: ToasterProps) => {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    toastStore.getServerSnapshot,
  );

  const visibleToasts = useMemo(() => {
    if (!maxToasts || toasts.length <= maxToasts) {
      return toasts;
    }

    return toasts.slice(toasts.length - maxToasts);
  }, [maxToasts, toasts]);

  return (
    <ol
      aria-live="polite"
      aria-relevant="additions removals"
      className={cx(
        getSlotClass(classNames, 'viewport'),
        getPositionClass(classNames, position),
      )}
      data-position={position}
    >
      {visibleToasts.map((toast) => (
        <ToastItem
          key={toast.id}
          classNames={classNames}
          defaultDuration={duration}
          icon={icons?.[toast.type] ?? icons?.default}
          position={position}
          renderToast={renderToast}
          toast={toast}
        />
      ))}
    </ol>
  );
};
