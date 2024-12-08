import React, { useState } from 'react';
import { AuthForm } from './components/AuthForm';

function App() {
  const [formType, setFormType] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-4 pt-6">
          <button
            onClick={() => setFormType('login')}
            className={`px-4 py-2 rounded-md ${
              formType === 'login'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setFormType('signup')}
            className={`px-4 py-2 rounded-md ${
              formType === 'signup'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Sign Up
          </button>
        </div>
        <AuthForm type={formType} />
      </div>
    </div>
  );
}

export default App;