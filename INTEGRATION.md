# Medicare Frontend-Backend Integration

This document outlines the integration between the Medicare frontend application and the backend API.

## Authentication Integration

### API Service Layer

Created a centralized API service (`api.service.ts`) that handles all API calls to the backend:

- Manages authentication tokens using localStorage
- Provides methods for login, registration, and password management
- Handles error responses from the API
- Provides type safety with TypeScript interfaces

### Authentication Context

Implemented an authentication context (`AuthContext.tsx`) that:

- Manages user authentication state across the application
- Provides login, register, and logout functionality
- Handles role-based redirection after authentication
- Stores user information and authentication status
- Manages loading and error states

### Protected Routes

Created a route protection system that:

- Prevents unauthorized access to dashboard pages
- Redirects users based on their roles (patient, practitioner, admin)
- Shows appropriate loading states during authentication checks
- Allows public access to login and signup pages

### Components Updated

1. **LoginForm**:
   - Integrated with AuthContext for authentication
   - Added error handling and display
   - Improved UX with loading states

2. **SignUpForm**:
   - Connected to the registration API
   - Added validation for access codes
   - Improved error handling and user feedback

3. **ProtectedRoute**:
   - Created a reusable component for route protection
   - Implements role-based access control
   - Provides consistent loading experience

4. **LogoutButton**:
   - Added a reusable logout component
   - Integrated with auth context

5. **ProfileInfo**:
   - Created a component to display user information
   - Pulls data from the authentication context

### Application Structure

1. **RootProvider**:
   - Created a unified provider component
   - Combines theme, animation, and authentication contexts
   - Simplifies layout components

2. **Dashboard Layouts**:
   - Updated to use role-based protection
   - Integrated with authentication context

## User Flow

1. **Login**:
   - User enters credentials
   - API validates credentials
   - On success, user is redirected to appropriate dashboard based on role
   - On failure, error message is displayed

2. **Registration**:
   - User enters registration information including access code
   - API validates information and access code
   - On success, user is redirected to login page
   - On failure, specific error message is displayed

3. **Dashboard Access**:
   - Protected routes verify authentication status
   - Unauthenticated users are redirected to login
   - Users with incorrect roles are redirected to appropriate dashboard

4. **Profile**:
   - User information is displayed from authentication context
   - Profile page shows relevant user details

## Next Steps

1. **Forgot Password Flow**:
   - Implement password reset functionality
   - Connect to backend password reset endpoints

2. **Profile Management**:
   - Add ability to update profile information
   - Connect to user update endpoints

3. **Error Handling Improvements**:
   - Add more specific error messages
   - Implement retry logic for failed requests

4. **Testing**:
   - Add unit tests for authentication flow
   - Add integration tests for API service

5. **Performance Optimization**:
   - Implement request caching
   - Add request debouncing for form submissions 