import React from 'react';
import { Formik, Form } from 'formik';
import { FormInput } from './FormInput';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { LoginFormValues, SignUpFormValues } from '../types/auth';
import { loginSchema, signUpSchema } from '../utils/validation';
import { Lock, Mail, User } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const isLogin = type === 'login';
  
  const initialValues: LoginFormValues | SignUpFormValues = isLogin ? {
    email: localStorage.getItem('rememberedEmail') || '',
    password: '',
    rememberMe: false
  } : {
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  };

  const handleSubmit = async (values: LoginFormValues | SignUpFormValues, { setSubmitting, resetForm }: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (isLogin && 'rememberMe' in values) {
      if (values.rememberMe) {
        localStorage.setItem('rememberedEmail', values.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
    }
    
    alert(`${isLogin ? 'Login' : 'Sign Up'} Successful!`);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          {isLogin ? (
            <Lock className="h-12 w-12 text-blue-600" />
          ) : (
            <User className="h-12 w-12 text-blue-600" />
          )}
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={initialValues}
            validationSchema={isLogin ? loginSchema : signUpSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form className="space-y-6">
                {!isLogin && (
                  <FormInput
                    name="name"
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                )}

                <FormInput
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="you@example.com"
                  autoComplete="email"
                />

                <FormInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />

                {!isLogin && (
                  <>
                    <PasswordStrengthIndicator password={values.password} />
                    <FormInput
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                  </>
                )}

                {isLogin && (
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};