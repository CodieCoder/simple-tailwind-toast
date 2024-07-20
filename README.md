# Simple Tailwind Toast

# Simple tailwind toast is a simple toast that comes with customizable components styled with TailwindCSS.

A flexible and customizable toast notification component for React applications. This package provides an easy-to-use toast system that can be styled with CSS, SCSS, Less, or Tailwind CSS.

## Features

- Easy integration with React applications
- Customizable styling options (CSS, SCSS, Less, Tailwind CSS)
- Flexible positioning of toast notifications
- Simple API for creating and managing toasts

## Installation

Install the package using npm:

```bash
npm install simple-tailwind-toast
Or using yarn:
yarn add simple-tailwind-toast
```

# Usage

Here's a basic example of how to use Simple Tailwind Toast in your React application:

```bash
import React from 'react';
import {
  SimpleToastProvider,
  SimpleToaster,
  useSimpleToast } from 'simple-tailwind-toast';

const ToastTest = () => {
  return (
    <SimpleToastProvider>
      <ToastMain />
      <SimpleToaster />
    </SimpleToastProvider>
  );
};

const ToastMain = () => {
  const { toast } = useSimpleToast();

  return (
    <div>
      <div className="text-3xl font-bold underline text-red-600">
        Tailwind test!
      </div>
      <br />
      <br />
      <button
        onClick={() => {
          toast.add({
            content: {
              title: 'Hello Toast!',
              description: 'Testing Simple tailwind toast',
            },
          });
        }}
        className="bg-slate-300 text-black p-2 m-2"
      >
        Click to toast
      </button>
    </div>
  );
};

export default ToastTest;

```

# API

SimpleToastProvider
Wrap your application with SimpleToastProvider to enable the toast functionality.

```bash
SimpleToastProvider: React.FC<"children: React.ReactNode">
```

SimpleToaster
Place SimpleToaster component at the root of your app or any where ever you can have access to the toast provider.
You can style the toasts using CSS, SCSS, Less, or Tailwind CSS. The component provides class names that you can target for custom styling.

```bash
SimpleToaster: FC<{
    classNames?: ISimpleClassNames;
    position?: TToastPosition;
}>

 TToastPosition = 'bottomCenter'| 'bottomLeft'| 'bottomRight'| 'midCenter'| 'midLeft'| 'midRight' | 'topCenter'| 'topLeft'| 'topRight';)

ISimpleClassNames {
  title?: string;
  description?: string;
  close?: string;
  types?: {
    default?: string;
    error?: string;
    warning?: string;
    success?: string;
  };
}
```

useSimpleToast
A hook that provides the toast object with methods to manage toasts.

```bash
 useSimpleToast: () => {
    store: Partial<IToastContextStore>;
    toast: {
        add: (toast: Partial<ISimpleToast>) => void;
        remove: (id: string) => void;
        removeAll: () => void;
    };
}

```

# toast.add

Adds a new toast notification.

```bash
  toast.add({
            content: {
              title: 'Hello Toast!',
              description: 'Testing Simple tailwind toast',
            },
          });
```

content: An object containing title, description and duration (in milliseconds ) for that particular toast

# toast.remove

Removes a toast using id

```bash
toast.remove(toast.id);
```

# toast.removeAll

Removes all toast notification

```bash
  toast.removeAll(toast.id);
```

# Types

```bash

TToastPosition =
  | 'bottomCenter'
  | 'bottomLeft'
  | 'bottomRight'
  | 'midCenter'
  | 'midLeft'
  | 'midRight'
  | 'topCenter'
  | 'topLeft'
  | 'topRight';


SimpleClassNames {
  title?: string;
  description?: string;
  close?: string;
  types?: {
    default?: string;
    error?: string;
    warning?: string;
    success?: string;
  };
}


ISimpleToastContent {
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: 'error' | 'success' | 'warning';
}

 ISimpleToast {
  id: string;
  content: ISimpleToastContent;
  duration: number;
}

IToastContextStore {
  toasts: ISimpleToast[];
}

```

> Customization
> You can customize the appearance and behavior of toasts by passing props to SimpleToaster or by styling the provided class names.
> Contributing
> Contributions are welcome! Please feel free to submit a Pull Request.
> License
> This project is licensed under the MIT License - see the LICENSE file for details.
