# MediCare FHIR API - Frontend Integration Guide

This guide provides detailed instructions for integrating your NextJS frontend with the MediCare FHIR API backend, focusing on authentication flows.

## Table of Contents

1. [API Base URL](#api-base-url)
2. [Authentication Endpoints](#authentication-endpoints)
3. [Role-Based Redirects](#role-based-redirects)
4. [Error Handling](#error-handling)
5. [Implementation Examples](#implementation-examples)
6. [Best Practices](#best-practices)

## API Base URL

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

## Authentication Endpoints

### 1. Login

**Endpoint:** `POST /auth/login`

**Request:**
```javascript
const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Error handling
      throw new Error(data.issue?.[0]?.diagnostics || 'Login failed');
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
```

**Successful Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "68591f542a3a08dcd7baa8b9",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "status": "active"
    }
  }
}
```

**Error Response:**
```json
{
  "resourceType": "OperationOutcome",
  "issue": [
    {
      "severity": "warning",
      "code": "security",
      "diagnostics": "Invalid credentials",
      "details": {
        "text": "Invalid credentials"
      }
    }
  ]
}
```

### 2. Registration

**Endpoint:** `POST /auth/register`

**Request:**
```javascript
const registerUser = async (name, email, password, repeatPassword, accessCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        repeatPassword,
        accessCode,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Error handling
      throw new Error(data.issue?.[0]?.diagnostics || 'Registration failed');
    }
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
```

**Successful Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "685fdb712054e028460a9307",
      "name": "Dr. Sarah Williams",
      "email": "practitioner@example.com",
      "role": "practitioner",
      "status": "active",
      "phone": "555-987-6543",
      "fhirResourceId": "112",
      "fhirResourceType": "Practitioner"
    }
  }
}
```

**Error Response (Invalid Access Code):**
```json
{
  "resourceType": "OperationOutcome",
  "issue": [
    {
      "severity": "warning",
      "code": "not-found",
      "diagnostics": "Access code not found or invalid",
      "details": {
        "text": "Access code not found or invalid"
      }
    }
  ]
}
```

### 3. Forgot Password

**Endpoint:** `POST /auth/forgot-password`

**Request:**
```javascript
const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Error handling
      throw new Error(data.issue?.[0]?.diagnostics || 'Failed to send reset code');
    }
    
    return data;
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};
```

**Successful Response:**
```json
{
  "success": true,
  "data": {
    "message": "Password reset code has been sent to your email"
  }
}
```

### 4. Reset Password

**Endpoint:** `POST /auth/reset-password`

**Request:**
```javascript
const resetPassword = async (email, resetCode, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        resetCode,
        newPassword,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Error handling
      throw new Error(data.issue?.[0]?.diagnostics || 'Password reset failed');
    }
    
    return data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};
```

**Successful Response:**
```json
{
  "success": true,
  "data": {
    "message": "Password has been reset successfully"
  }
}
```

## Role-Based Redirects

After successful login, redirect users based on their role:

```javascript
const handleLogin = async (email, password) => {
  try {
    const result = await loginUser(email, password);
    
    // Save token and user info in localStorage or state management solution
    localStorage.setItem('token', result.data.accessToken);
    localStorage.setItem('user', JSON.stringify(result.data.user));
    
    // Redirect based on user role
    switch (result.data.user.role) {
      case 'admin':
        router.push('/admin/dashboard');
        break;
      case 'practitioner':
        router.push('/practitioner/dashboard');
        break;
      case 'patient':
        router.push('/patient/dashboard');
        break;
      default:
        router.push('/dashboard');
    }
    
  } catch (error) {
    setError(error.message);
  }
};
```

## Error Handling

Implement consistent error handling across your application:

```javascript
// components/ErrorAlert.js
const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;
  
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={onClose}>
        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
        </svg>
      </span>
    </div>
  );
};
```

Use this component in your forms:

```javascript
// Login Page Example
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const result = await loginUser(email, password);
      // Handle success...
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        {error && <ErrorAlert message={error} onClose={() => setError('')} />}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Form fields... */}
        </form>
      </div>
    </div>
  );
};
```

## Implementation Examples

### 1. Login Page

```jsx
// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ErrorAlert from '../components/ErrorAlert';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.issue?.[0]?.diagnostics || 'Login failed');
      }
      
      // Save token and user info
      localStorage.setItem('token', data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      
      // Redirect based on role
      const { role } = data.data.user;
      const redirectPaths = {
        admin: '/admin/dashboard',
        practitioner: '/practitioner/dashboard',
        patient: '/patient/dashboard'
      };
      
      router.push(redirectPaths[role] || '/dashboard');
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        {error && <ErrorAlert message={error} onClose={() => setError('')} />}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### 2. Registration Page

```jsx
// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ErrorAlert from '../components/ErrorAlert';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    accessCode: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.repeatPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.issue?.[0]?.diagnostics || 'Registration failed');
      }
      
      // Redirect to login page after successful registration
      router.push('/login?registered=true');
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        
        {error && <ErrorAlert message={error} onClose={() => setError('')} />}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="repeatPassword" className="sr-only">Confirm Password</label>
              <input
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formData.repeatPassword}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="accessCode" className="sr-only">Access Code</label>
              <input
                id="accessCode"
                name="accessCode"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Access Code"
                value={formData.accessCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
          
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### 3. Forgot Password Page

```jsx
// pages/forgot-password.js
import { useState } from 'react';
import Link from 'next/link';
import ErrorAlert from '../components/ErrorAlert';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.issue?.[0]?.diagnostics || 'Failed to send reset code');
      }
      
      setSuccess(true);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a code to reset your password.
          </p>
        </div>
        
        {error && <ErrorAlert message={error} onClose={() => setError('')} />}
        
        {success ? (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Reset code sent</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>A password reset code has been sent to your email address. Please check your inbox.</p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <Link href="/reset-password" className="bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Enter Reset Code
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </div>
            
            <div className="text-center">
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
```

## Best Practices

1. **Secure Token Storage:**
   - Store JWT tokens in HttpOnly cookies when possible for better security
   - Clear tokens on logout

2. **Loading States:**
   - Always provide visual feedback during API calls
   - Disable form submission buttons when requests are in progress

3. **Error Handling:**
   - Display user-friendly error messages
   - Log detailed errors for debugging
   - Implement error boundaries for unexpected issues

4. **Form Validation:**
   - Validate inputs on both client and server side
   - Provide immediate feedback for invalid inputs

5. **Role-Based Access Control:**
   - Implement route guards in Next.js to protect routes based on user roles
   - Create a Higher-Order Component or custom hook for authorization checks

6. **State Management:**
   - Consider using React Context API or Redux for global state management
   - Keep authentication state accessible throughout the application

7. **Responsive Design:**
   - Ensure authentication forms work well on all device sizes
   - Test your UI on multiple screen sizes

8. **Accessibility:**
   - Ensure forms are accessible with proper labels and ARIA attributes
   - Make sure error messages are announced to screen readers

9. **Internationalization:**
   - Consider supporting multiple languages for error messages and UI text
   - Use a library like react-intl or next-i18next

10. **Automated Testing:**
    - Write unit tests for authentication logic
    - Create integration tests for form submissions and redirects 