import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { CandidateLayout } from '@/layouts/CandidateLayout';
import { RecruiterLayout } from '@/layouts/RecruiterLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { RoleRoute } from '@/components/common/RoleRoute';

// Auth pages
import { Login } from '@/pages/auth/Login';
import { RegisterCandidate } from '@/pages/auth/RegisterCandidate';
import { RegisterRecruiter } from '@/pages/auth/RegisterRecruiter';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { ResetPassword } from '@/pages/auth/ResetPassword';
import { VerifyEmail } from '@/pages/auth/VerifyEmail';

// App pages
import { JobList } from '@/pages/candidate/JobList';
import { RecruiterDashboard } from '@/pages/recruiter/Dashboard';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { NotFound } from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/jobs" replace />,
  },

  // Auth Layout (Public)
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <RegisterCandidate />,
      },
      {
        path: '/register-recruiter',
        element: <RegisterRecruiter />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '/verify-email',
        element: <VerifyEmail />,
      },
    ],
  },

  // Protected Candidate Workspace (also allows public job viewing)
  {
    element: <CandidateLayout />,
    children: [
      {
        path: '/jobs',
        element: <JobList />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <RoleRoute allowedRoles={['CANDIDATE']} />,
            children: [
              {
                path: '/candidate/resumes',
                element: <JobList />,
              },
              {
                path: '/candidate/applications',
                element: <JobList />,
              },
            ],
          },
        ],
      },
    ],
  },

  // Protected Recruiter Workspace
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleRoute allowedRoles={['RECRUITER']} />,
        children: [
          {
            element: <RecruiterLayout />,
            children: [
              {
                path: '/recruiter/dashboard',
                element: <RecruiterDashboard />,
              },
              {
                path: '/recruiter/jobs',
                element: <RecruiterDashboard />,
              },
              {
                path: '/recruiter/applicants',
                element: <RecruiterDashboard />,
              },
            ],
          },
        ],
      },
    ],
  },

  // Protected Admin Workspace
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleRoute allowedRoles={['ADMIN']} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: '/admin/dashboard',
                element: <AdminDashboard />,
              },
              {
                path: '/admin/companies',
                element: <AdminDashboard />,
              },
              {
                path: '/admin/users',
                element: <AdminDashboard />,
              },
            ],
          },
        ],
      },
    ],
  },

  // Catch-all
  {
    path: '*',
    element: <NotFound />,
  },
]);
