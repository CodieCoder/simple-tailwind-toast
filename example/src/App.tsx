import { Toaster, toast } from 'simple-tailwind-toast';
import './index.css';

function App() {
  const handleSuccess = () => {
    toast.success('Success!', {
      description: 'This is a success toast.',
      duration: 3000,
    });
  };

  const handleError = () => {
    toast.error('Error!', {
      description: 'Something went wrong.',
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Test simple-tailwind-toast</h1>
      <div className="flex gap-4">
        <button 
          onClick={handleSuccess}
          className="px-6 py-2 font-semibold bg-green-600 text-white rounded shadow-lg hover:bg-green-500 hover:-translate-y-1 transition-all"
        >
          Success Toast
        </button>
        <button 
          onClick={handleError}
          className="px-6 py-2 font-semibold bg-red-600 text-white rounded shadow-lg hover:bg-red-500 hover:-translate-y-1 transition-all"
        >
          Error Toast
        </button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
