# Simple tailwind toast is a simple toast that comes with customizable components styled with TailwindCSS.

# Installation

# npm install simple-tailwind-toast | yarn add simple-tailwind-toast

# Example

``
import { SimpleToastProvider, SimpleToaster } from '../lib';

import { useSimpleToast } from '../lib';

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
title: 'Testing',
description:
'Hello World',
},
});
}}
className="bg-slate-300 text-black p-2 m-2" >
Click to toast
</button>
</div>
);
};

const ToastTest = () => {
return (
<SimpleToastProvider>
<ToastMain />
<SimpleToaster position="topRight" />
</SimpleToastProvider>
);
};
``
