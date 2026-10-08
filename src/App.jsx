import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignupPage, PendingPage } from './pages/SignupPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { FacultyDashboard } from './pages/FacultyDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { PendingRegistrationsPage } from './pages/PendingRegistrationsPage';
import { DocumentViewPage } from './pages/DocumentViewPage';
import { DummyPage } from './pages/DummyPage';
import { StudentLayout, FacultyLayout, AdminLayout } from './components/layout/Layouts';

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
            <StudentLayout>
              <StudentDashboard />
            </StudentLayout>
          }
        />
        <Route
          path="/student/documents"
          element={
            <StudentLayout>
              <StudentDashboard />
            </StudentLayout>
          }
        />
        <Route
          path="/student/subjects"
          element={
            <StudentLayout>
              <DummyPage title="Subjects Directory" subtitle="Browse curriculum modules mapped to your department." />
            </StudentLayout>
          }
        />
        <Route
          path="/student/bookmarks"
          element={
            <StudentLayout>
              <DummyPage title="My Bookmarks" subtitle="Saved academic materials for quick offline learning." />
            </StudentLayout>
          }
        />
        <Route
          path="/student/recent"
          element={
            <StudentLayout>
              <DummyPage title="Recently Read Documents" subtitle="Pick up right where you left off." />
            </StudentLayout>
          }
        />
        <Route
          path="/student/profile"
          element={
            <StudentLayout>
              <DummyPage title="Student Profile Settings" subtitle="Manage your academic credentials & language preferences." />
            </StudentLayout>
          }
        />

        {/* Faculty Role Routes */}
        <Route
          path="/faculty"
          element={
            <FacultyLayout>
              <FacultyDashboard />
            </FacultyLayout>
          }
        />
        <Route
          path="/faculty/documents"
          element={
            <FacultyLayout>
              <FacultyDashboard />
            </FacultyLayout>
          }
        />
        <Route
          path="/faculty/upload"
          element={
            <FacultyLayout>
              <FacultyDashboard />
            </FacultyLayout>
          }
        />
        <Route
          path="/faculty/profile"
          element={
            <FacultyLayout>
              <DummyPage title="Faculty Profile Settings" subtitle="Update your department designation & course assignments." />
            </FacultyLayout>
          }
        />

        {/* Admin Role Routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/pending-registrations"
          element={
            <AdminLayout>
              <PendingRegistrationsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <DummyPage title="User Management" subtitle="Manage active students, faculty, and role permissions." />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/departments"
          element={
            <AdminLayout>
              <DummyPage title="Department Configuration" subtitle="Configure academic streams and faculty departments." />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/subjects"
          element={
            <AdminLayout>
              <DummyPage title="Subject Master" subtitle="Manage collegiate subjects and code mappings." />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/documents"
          element={
            <AdminLayout>
              <DummyPage title="Document Registry Audit" subtitle="Audit all published academic notes and syllabus files." />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminLayout>
              <DummyPage title="Reports & Analytics" subtitle="Monitor workspace usage, student read rates, and AI interactions." />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <AdminLayout>
              <DummyPage title="System Notifications" subtitle="Broadcast academic alerts and administrative notices." />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <DummyPage title="Platform Settings" subtitle="Manage security rules, Supabase configuration, and AI models." />
            </AdminLayout>
          }
        />

        {/* Document Reader Route (Shared) */}
        <Route
          path="/documents/:id"
          element={
            <StudentLayout>
              <DocumentViewPage />
            </StudentLayout>
          }
        />

        {/* Default Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
