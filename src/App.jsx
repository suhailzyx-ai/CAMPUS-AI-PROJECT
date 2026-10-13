import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignupPage, PendingPage } from './pages/SignupPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { FacultyDashboard } from './pages/FacultyDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { PendingRegistrationsPage } from './pages/PendingRegistrationsPage';
import { DocumentViewPage } from './pages/DocumentViewPage';
import { DummyPage } from './pages/DummyPage';
import { StudentLayout, FacultyLayout, AdminLayout } from './components/layout/Layouts';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { getCurrentUser } from './services/authService';

/**
 * Shared/legacy document reader route that respects user role:
 * - If current user is Faculty, seamlessly route them to the Faculty AI Study Reader.
 * - If Student, render the reader within the Student layout.
 */
const SharedDocumentReaderRoute = () => {
  const { id } = useParams();
  const user = getCurrentUser();

  if (user?.role === 'faculty') {
    return <Navigate to={`/faculty/documents/${id}/reader`} replace />;
  }

  return (
    <StudentLayout>
      <DocumentViewPage role="student" />
    </StudentLayout>
  );
};

/**
 * Helper to normalize /faculty/documents/:id to /faculty/documents/:id/reader
 */
const FacultyDocRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/faculty/documents/${id}/reader`} replace />;
};

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pending" element={<PendingPage />} />

        {/* Student Role Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout>
                <StudentDashboard />
              </StudentLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/documents"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout>
                <StudentDashboard />
              </StudentLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/subjects"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout>
                <DummyPage title="Subjects Directory" subtitle="Browse curriculum modules mapped to your department." />
              </StudentLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/bookmarks"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout>
                <DummyPage title="My Bookmarks" subtitle="Saved academic materials for quick offline learning." />
              </StudentLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/recent"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout>
                <DummyPage title="Recently Read Documents" subtitle="Pick up right where you left off." />
              </StudentLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout>
                <DummyPage title="Student Profile Settings" subtitle="Manage your academic credentials & language preferences." />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        {/* Faculty Role Routes */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRoles={['faculty', 'admin']}>
              <FacultyLayout>
                <FacultyDashboard />
              </FacultyLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/documents"
          element={
            <ProtectedRoute allowedRoles={['faculty', 'admin']}>
              <FacultyLayout>
                <FacultyDashboard />
              </FacultyLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/upload"
          element={
            <ProtectedRoute allowedRoles={['faculty', 'admin']}>
              <FacultyLayout>
                <FacultyDashboard />
              </FacultyLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/profile"
          element={
            <ProtectedRoute allowedRoles={['faculty', 'admin']}>
              <FacultyLayout>
                <DummyPage title="Faculty Profile Settings" subtitle="Update your department designation & course assignments." />
              </FacultyLayout>
            </ProtectedRoute>
          }
        />

        {/* Dedicated Faculty AI Study Reader Routes */}
        <Route
          path="/faculty/documents/:id/reader"
          element={
            <ProtectedRoute allowedRoles={['faculty', 'admin']}>
              <FacultyLayout>
                <DocumentViewPage role="faculty" />
              </FacultyLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/documents/:documentId/reader"
          element={
            <ProtectedRoute allowedRoles={['faculty', 'admin']}>
              <FacultyLayout>
                <DocumentViewPage role="faculty" />
              </FacultyLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/documents/:id"
          element={
            <ProtectedRoute allowedRoles={['faculty', 'admin']}>
              <FacultyDocRedirect />
            </ProtectedRoute>
          }
        />

        {/* Admin Role Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pending-registrations"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <PendingRegistrationsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <DummyPage title="User Management" subtitle="Manage active students, faculty, and role permissions." />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/departments"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <DummyPage title="Department Configuration" subtitle="Configure academic streams and faculty departments." />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/subjects"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <DummyPage title="Subject Master" subtitle="Manage collegiate subjects and code mappings." />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/documents"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <DummyPage title="Document Registry Audit" subtitle="Audit all published academic notes and syllabus files." />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <DummyPage title="Reports & Analytics" subtitle="Monitor workspace usage, student read rates, and AI interactions." />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <DummyPage title="System Notifications" subtitle="Broadcast academic alerts and administrative notices." />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <DummyPage title="Platform Settings" subtitle="Manage security rules, Supabase configuration, and AI models." />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Document Reader Route (Role-aware shared entry point) */}
        <Route
          path="/documents/:id"
          element={<SharedDocumentReaderRoute />}
        />

        {/* Default Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
