# Simple Tailwind Toast

A lightweight, providerless toast library for React 18+ apps. It ships plain React components and Tailwind class presets, not generated CSS.

## Why

- No runtime dependencies.
- No provider or context setup.
- No CSS injection and no bundled Tailwind reset.
- Fully customizable through Tailwind classes, data attributes, or a custom renderer.
- SSR-safe imports.

## Install

```bash
npm install simple-tailwind-toast
```

```bash
yarn add simple-tailwind-toast
```

## Tailwind Setup

The package does not ship CSS. If you use the default class presets, make sure Tailwind scans the installed package.

Tailwind v4:

```css
@import "tailwindcss";

@source "../node_modules/simple-tailwind-toast/dist";
```

Use the v4 `@import` form above. The older `@tailwind base; @tailwind components; @tailwind utilities;` directives can miss theme-backed utility classes in v4 projects.

Tailwind v3:

```js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/simple-tailwind-toast/dist/**/*.{js,mjs,cjs}',
  ],
};
```

## Quick Start

```tsx
import { Toaster, toast } from 'simple-tailwind-toast';

export function App() {
  return (
    <>
      <button
        onClick={() =>
          toast.success('Saved', {
            description: 'Your changes are live.',
          })
        }
      >
        Show toast
      </button>

      <Toaster position="top-right" />
    </>
  );
}
```

## API

```ts
toast('Message');
toast({ title: 'Message', description: 'More detail' });

toast.success('Saved', options);
toast.error('Failed', options);
toast.warning('Check this', options);
toast.info('Heads up', options);

toast.dismiss(id);
toast.clear();
```

Every `toast.*` call returns the toast id. Passing an existing `id` updates that toast instead of creating a duplicate.

```tsx
const id = toast.info('Uploading', {
  description: '0%',
  duration: false,
});

toast.success('Upload complete', {
  id,
  description: '100%',
  duration: 3000,
});
```

## Options

```ts
type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';
type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

type ToastOptions = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: ToastType;
  duration?: number | false;
  dismissible?: boolean;
  className?: string;
  onDismiss?: (toast: ToastRecord) => void;
};
```

`duration` is in milliseconds. The default is `4000`; use `duration: false` for persistent toasts.

## Customization

Use `classNames` to replace any slot class. The default classes are exported as `toastClasses.default` if you want to copy and adjust them.

```tsx
import { Toaster, toastClasses } from 'simple-tailwind-toast';

<Toaster
  classNames={{
    ...toastClasses.default,
    toast:
      'pointer-events-auto rounded-md border bg-zinc-950 p-4 text-sm text-white shadow-lg',
    variants: {
      ...toastClasses.default.variants,
      success: 'border-emerald-400',
      error: 'border-red-400',
    },
  }}
/>;
```

You can also target attributes:

```css
[data-type="success"] {
  border-color: var(--color-emerald-400);
}
```

For full control, pass `renderToast`.

```tsx
<Toaster
  renderToast={(toast, { dismiss }) => (
    <div>
      <strong>{toast.title}</strong>
      <button onClick={dismiss} type="button">
        Close
      </button>
    </div>
  )}
/>
```

## Toaster Props

```ts
type ToasterProps = {
  position?: ToastPosition;
  duration?: number | false;
  maxToasts?: number;
  classNames?: ToastClassNames;
  icons?: Partial<Record<ToastType, React.ReactNode>>;
  renderToast?: (toast: ToastRecord, helpers: { dismiss: () => void }) => React.ReactNode;
};
```

## Bundle

The package externalizes React and contains no CSS-in-JS runtime, no Tailwind compiler output, and no class-merging dependency. The current production ESM build is about 2.61 KB gzip excluding source maps, and the dry-run npm package is about 15.7 KB packed.

## Development

```bash
corepack enable
yarn install
yarn test
yarn typecheck
yarn build
```

Use `yarn pack:dry` before release changes to verify the files that will be published.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening larger pull requests, see [CHANGELOG.md](./CHANGELOG.md) for release notes, and report vulnerabilities through [SECURITY.md](./SECURITY.md).

## License

MIT
